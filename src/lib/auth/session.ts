import 'server-only';
import { cookies } from 'next/headers';
import prisma from '#@/lib/connection/prisma';
import { hashToken, randomToken } from './crypto';

// NOTA: los nombres `prisma.session` / relación `users` asumen que, tras
// `prisma db pull`, la tabla `session` (creada vía @@map en el repo que
// gestiona las migraciones) se introspecta con ese mismo nombre literal —
// el mismo patrón que ya siguen `notes`/`tareas`/`usuarios_en_notes` en
// este repo. Verificar contra el schema real después del pull.

const COOKIE_NAME = 'rs_session';
const REMEMBER_MS = 1000 * 60 * 60 * 24 * 30; // 30 días
const DEFAULT_MS = 1000 * 60 * 60 * 8; // 8 horas

export async function createSession(
  userId: string, remember: boolean
): Promise<void> {
  const raw = randomToken();
  const expiresAt = new Date( Date.now() + ( remember
    ? REMEMBER_MS
    : DEFAULT_MS ) );

  await prisma.session.create( {
    data: {
      id       : crypto.randomUUID(),
      userId,
      tokenHash: hashToken( raw ),
      expiresAt,
    },
  } );

  const jar = await cookies();

  jar.set(
    COOKIE_NAME, raw, {
      httpOnly: true,
      secure  : process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path    : '/',
      expires : expiresAt,
    }
  );
}

export async function getCurrentLawyer() {
  const jar = await cookies();
  const raw = jar.get( COOKIE_NAME )?.value;

  if ( !raw ) {
    return null;
  }

  const session = await prisma.session.findUnique( {
    where: {
      tokenHash: hashToken( raw )
    },
    include: {
      user: true
    },
  } );

  if ( !session || session.expiresAt < new Date() ) {
    return null;
  }

  return session.user;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const raw = jar.get( COOKIE_NAME )?.value;

  if ( raw ) {
    await prisma.session.deleteMany( {
      where: {
        tokenHash: hashToken( raw )
      },
    } );
  }

  jar.delete( COOKIE_NAME );
}
