import 'server-only';
import prisma from '#@/lib/connection/prisma';
import { TipoToken } from '#@/app/generated/prisma/enums';
import { hashToken, randomToken } from './crypto';

// NOTA: mismo supuesto de nombres que en session.ts — verificar
// `prisma.verification_tokens` contra el schema real tras `db pull`.

const EXPIRY_MS: Record<TipoToken, number> = {
  EMAIL_VERIFICATION: 1000 * 60 * 60 * 24, // 24h
  PASSWORD_RESET    : 1000 * 60 * 60, // 1h
};

const COOLDOWN_MS = 60_000;

export async function issueToken(
  userId: string, tipo: TipoToken
): Promise<{ raw: string } | { cooldown: true }> {
  const reciente = await prisma.verificationToken.findFirst( {
    where: {
      userId,
      tipo,
      usedAt   : null,
      expiresAt: {
        gt: new Date()
      },
    },
    orderBy: {
      createdAt: 'desc'
    },
  } );

  if ( reciente && Date.now() - reciente.createdAt.getTime() < COOLDOWN_MS ) {
    return {
      cooldown: true
    };
  }

  const raw = randomToken();

  await prisma.verificationToken.create( {
    data: {
      id       : crypto.randomUUID(),
      userId,
      tokenHash: hashToken( raw ),
      tipo,
      expiresAt: new Date( Date.now() + EXPIRY_MS[ tipo ] ),
    },
  } );

  return {
    raw
  };
}

export async function consumeToken(
  raw: string,
  tipo: TipoToken
): Promise<{ ok: true; userId: string } | { ok: false; reason: 'invalid' | 'expired' | 'used' }> {
  const registro = await prisma.verificationToken.findUnique( {
    where: {
      tokenHash: hashToken( raw )
    },
  } );

  if ( !registro || registro.tipo !== tipo ) {
    return {
      ok    : false,
      reason: 'invalid'
    };
  }

  if ( registro.usedAt ) {
    return {
      ok    : false,
      reason: 'used'
    };
  }

  if ( registro.expiresAt < new Date() ) {
    return {
      ok    : false,
      reason: 'expired'
    };
  }

  await prisma.verificationToken.update( {
    where: {
      id: registro.id
    },
    data: {
      usedAt: new Date()
    },
  } );

  return {
    ok    : true,
    userId: registro.userId
  };
}
