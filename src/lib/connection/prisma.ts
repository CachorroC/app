
import { PrismaClient } from '#@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString
  = 'postgresql://postgres:Tengo1amo@192.168.1.101:5432/RyS?schema=public';

const adapter = new PrismaPg( {
  connectionString,
} );

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient( {
  adapter,
} );

if ( process.env.NODE_ENV !== 'production' ) {
  globalForPrisma.prisma = prisma;
}

export default prisma;