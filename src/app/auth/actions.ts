'use server';

// Nota de desarrollo:
// - Infraestructura de correo: no existía envío de correo en el repo; se
//   agregó `nodemailer` + SMTP_HOST/PORT/USER/PASS/FROM. `next-auth` sigue
//   sin usarse.
// - Sesión: `sessions { id, userId, tokenHash (sha256, único), createdAt,
//   expiresAt }`, token de cookie opaco de 256 bits, nunca se guarda en
//   claro. `verification_tokens { id, userId, tokenHash, tipo, createdAt,
//   expiresAt, usedAt }`, un solo modelo + enum, `usedAt` marca el consumo
//   en vez de borrar la fila. Vigencia: 24h verificación / 1h reset. Sesión:
//   30 días (Recordarme) / 8 horas de lo contrario. No se agregó secreto de
//   firma de cookie — el token opaco tiene 256 bits de entropía y solo se
//   compara por su hash en el servidor.
// - Credenciales demo: el atajo carlos@rs.com/demo1234 del prototipo nunca
//   se conectó a ningún flujo real.
// - Pendiente (fuera de alcance): `emailVerificadoEn` queda poblado pero
//   nada en la UI lo consume todavía (posible aviso de "verifique su
//   correo").
// - Esquema/migración: este repo no gestiona migraciones; los modelos
//   `sessions`/`verification_tokens`/`TipoToken`/`emailVerificadoEn` se
//   definieron como spec para el repo que sí las gestiona, y se sincronizan
//   aquí con `prisma db pull` + `prisma generate`.

import { redirect } from 'next/navigation';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import prisma from '#@/lib/connection/prisma';
import { TipoToken } from '#@/app/generated/prisma/enums';
import { createSession, destroySession } from '#@/lib/auth/session';
import { consumeToken, issueToken } from '#@/lib/auth/tokens';
import { passwordScore } from '#@/lib/auth/password';
import { sendMail } from '#@/lib/mail/sender';
import { passwordResetEmail, verificationEmail } from '#@/lib/mail/templates';
import { AuthActionState } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esErrorConstraintUnico( error: unknown ): boolean {
  return Boolean( error && typeof error === 'object' && 'code' in error && error.code === 'P2002' );
}

function campoConflicto( error: unknown ): string | null {
  if ( !error || typeof error !== 'object' || !( 'meta' in error ) ) {
    return null;
  }

  const {
    meta
  } = ( error as { meta?: { target?: string[] | string } } );
  const target = meta?.target;

  if ( Array.isArray( target ) ) {
    return target[ 0 ] ?? null;
  }

  return target ?? null;
}

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';
}

const SignInSchema = z.object( {
  email: z.string()
    .trim()
    .min( 1 )
    .regex( EMAIL_RE ),
  password: z.string()
    .min( 1 ),
} );

export async function signIn(
  prevState: AuthActionState, formData: FormData
): Promise<AuthActionState> {
  const parsed = SignInSchema.safeParse( {
    email   : formData.get( 'email' ),
    password: formData.get( 'password' ),
  } );

  if ( !parsed.success ) {
    const fieldErrors: AuthActionState[ 'fieldErrors' ] = {};

    for ( const issue of parsed.error.issues ) {
      const [
        campo
      ] = issue.path;

      if ( campo === 'email' ) {
        fieldErrors.email = 'Ingrese un correo válido.';
      }

      if ( campo === 'password' ) {
        fieldErrors.password = 'Ingrese su contraseña.';
      }
    }

    return {
      status: 'error',
      fieldErrors,
    };
  }

  const {
    email, password
  } = parsed.data;
  const remember = formData.get( 'remember' ) === 'on';

  const GENERIC_ERROR = 'Correo o contraseña incorrectos. Verifique e intente de nuevo.';

  const user = await prisma.user.findUnique( {
    where: {
      email: email.toLowerCase()
    },
  } );

  if ( !user || !user.passwordHash || !user.activo ) {
    return {
      status   : 'error',
      formError: GENERIC_ERROR,
    };
  }


  const valido = await bcrypt.compare(
    password, user.passwordHash
  );

  if ( !valido ) {
    return {
      status   : 'error',
      formError: GENERIC_ERROR,
    };
  }

  await prisma.user.update( {
    where: {
      id: user.id
    },
    data: {
      ultimoAccesoA: new Date(),
      editadoEn    : new Date(),
    },
  } );

  await createSession(
    user.id, remember
  );

  return {
    status: 'success'
  };
}

const SignUpSchema = z.object( {
  nombre: z.string()
    .trim()
    .min(
      1, 'Ingrese su nombre completo.'
    )
    .refine(
      ( v ) => {
        return v.split( /\s+/ )
          .filter( Boolean ).length >= 2;
      }, 'Ingrese nombre y apellido.'
    ),
  email: z.string()
    .trim()
    .min(
      1, 'Ingrese su correo.'
    )
    .regex(
      EMAIL_RE, 'Correo inválido.'
    ),
  rol: z.enum( [
    'ABOGADO',
    'ASISTENTE',
    'LECTOR'
  ] ),
  tarjetaProfesional: z.string()
    .trim()
    .optional(),
  password: z.string()
    .min(
      1, 'Ingrese una contraseña.'
    )
    .refine(
      ( v ) => {
        return passwordScore( v ) >= 2;
      }, 'Contraseña muy débil: use 8+ caracteres, mayúsculas y números.'
    ),
  password2: z.string()
    .min(
      1, 'Confirme su contraseña.'
    ),
  terms: z.literal(
    'on', {
      message: 'Debe aceptar la política de tratamiento de datos.'
    }
  ),
} )
  .refine(
    ( d ) => {
      return d.password === d.password2;
    }, {
      message: 'Las contraseñas no coinciden.',
      path   : [
        'password2'
      ],
    }
  )
  .superRefine( (
    d, ctx
  ) => {
    if ( d.rol === 'ABOGADO' && !d.tarjetaProfesional ) {
      ctx.addIssue( {
        code   : z.ZodIssueCode.custom,
        message: 'La tarjeta profesional es obligatoria para abogados.',
        path   : [
          'tarjetaProfesional'
        ],
      } );
    }
  } );

export async function signUp(
  prevState: AuthActionState, formData: FormData
): Promise<AuthActionState> {
  const parsed = SignUpSchema.safeParse( {
    nombre            : formData.get( 'nombre' ),
    email             : formData.get( 'email' ),
    rol               : formData.get( 'rol' ),
    tarjetaProfesional: formData.get( 'tarjetaProfesional' ) || undefined,
    password          : formData.get( 'password' ),
    password2         : formData.get( 'password2' ),
    terms             : formData.get( 'terms' ),
  } );

  if ( !parsed.success ) {
    const fieldErrors: AuthActionState[ 'fieldErrors' ] = {};
    let formError: string | undefined;

    for ( const issue of parsed.error.issues ) {
      const [
        campo
      ] = issue.path;

      if ( campo === 'terms' ) {
        formError = issue.message;
      } else if ( typeof campo === 'string' && [
        'nombre',
        'email',
        'password',
        'password2',
        'tarjetaProfesional'
      ].includes( campo ) ) {
        fieldErrors[ campo as keyof typeof fieldErrors ] = issue.message;
      }
    }

    return {
      status: 'error',
      fieldErrors,
      formError,
    };
  }

  const {
    nombre, email, rol, tarjetaProfesional, password
  } = parsed.data;

  let userId: string;

  try {
    const user = await prisma.user.create( {
      data: {
        id          : crypto.randomUUID(),
        email       : email.toLowerCase(),
        nombre,
        rol,
        activo      : true,
        passwordHash: await bcrypt.hash(
          password, 10
        ),
        tarjetaProfesional: rol === 'ABOGADO'
          ? tarjetaProfesional
          : null,
        emailVerificadoEn: null,
        editadoEn        : new Date(),
      },
      select: {
        id: true
      },
    } );

    userId = user.id;
  } catch ( error ) {
    if ( esErrorConstraintUnico( error ) ) {
      const campo = campoConflicto( error );

      if ( campo?.includes( 'tarjetaProfesional' ) ) {
        return {
          status     : 'error',
          fieldErrors: {
            tarjetaProfesional: 'Esta tarjeta profesional ya está registrada.'
          },
        };
      }

      return {
        status     : 'error',
        fieldErrors: {
          email: 'Este correo ya está registrado.'
        },
      };
    }

    throw error;
  }

  const token = await issueToken(
    userId, TipoToken.EMAIL_VERIFICATION
  );

  if ( 'raw' in token ) {
    try {
      await sendMail( {
        to: email.toLowerCase(),
        ...verificationEmail(
          nombre, `${ baseUrl() }/auth/verificar/${ token.raw }`
        ),
      } );
    } catch {
      // Envío best-effort — no bloquea el registro.
    }
  }

  return {
    status: 'success'
  };
}

export async function signOut(): Promise<void> {
  await destroySession();
  redirect( '/auth' );
}

const RequestResetSchema = z.object( {
  email: z.string()
    .trim()
    .regex( EMAIL_RE ),
} );

export async function requestPasswordReset(
  prevState: AuthActionState, formData: FormData
): Promise<AuthActionState> {
  const parsed = RequestResetSchema.safeParse( {
    email: formData.get( 'email' )
  } );

  if ( parsed.success ) {
    const user = await prisma.user.findUnique( {
      where: {
        email: parsed.data.email.toLowerCase()
      }
    } );

    if ( user ) {
      const token = await issueToken(
        user.id, TipoToken.PASSWORD_RESET
      );

      if ( 'raw' in token ) {
        try {
          await sendMail( {
            to: user.email,
            ...passwordResetEmail(
              user.nombre, `${ baseUrl() }/auth/restablecer/${ token.raw }`
            ),
          } );
        } catch {
          // Envío best-effort.
        }
      }
    }
  }

  return {
    status: 'success'
  };
}

const ResetPasswordSchema = z.object( {
  password: z.string()
    .min(
      1, 'Ingrese una contraseña.'
    )
    .refine(
      ( v ) => {
        return passwordScore( v ) >= 2;
      }, 'Contraseña muy débil: use 8+ caracteres, mayúsculas y números.'
    ),
  password2: z.string()
    .min(
      1, 'Confirme su contraseña.'
    ),
} )
  .refine(
    ( d ) => {
      return d.password === d.password2;
    }, {
      message: 'Las contraseñas no coinciden.',
      path   : [
        'password2'
      ],
    }
  );

export async function resetPassword(
  token: string,
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = ResetPasswordSchema.safeParse( {
    password : formData.get( 'password' ),
    password2: formData.get( 'password2' ),
  } );

  if ( !parsed.success ) {
    const fieldErrors: AuthActionState[ 'fieldErrors' ] = {};

    for ( const issue of parsed.error.issues ) {
      const [
        campo
      ] = issue.path;

      if ( campo === 'password' || campo === 'password2' ) {
        fieldErrors[ campo ] = issue.message;
      }
    }

    return {
      status: 'error',
      fieldErrors,
    };
  }

  const consumido = await consumeToken(
    token, TipoToken.PASSWORD_RESET
  );

  if ( !consumido.ok ) {
    return {
      status   : 'error',
      formError: 'Este enlace ya no es válido, solicite uno nuevo.',
    };
  }

  await prisma.user.update( {
    where: {
      id: consumido.userId
    },
    data: {
      passwordHash: await bcrypt.hash(
        parsed.data.password, 10
      ),
      editadoEn: new Date(),
    },
  } );

  return {
    status: 'success'
  };
}

export async function verifyEmail( token: string ): Promise<{ ok: true } | { ok: false; reason: 'invalid' | 'expired' | 'used' }> {
  const consumido = await consumeToken(
    token, TipoToken.EMAIL_VERIFICATION
  );

  if ( !consumido.ok ) {
    return consumido;
  }

  await prisma.user.update( {
    where: {
      id: consumido.userId
    },
    data: {
      emailVerificadoEn: new Date(),
      editadoEn        : new Date(),
    },
  } );

  return {
    ok: true
  };
}
