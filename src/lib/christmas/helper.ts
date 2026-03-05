/**
 * @deprecated This module used MongoDB which has been removed from the project.
 * This function is not used anywhere in the codebase.
 * If needed in the future, migrate to Prisma.
 */

import { unstable_noStore as noStore } from 'next/cache';

export async function christmasCollection() {
  noStore();
  throw new Error(
    'MongoDB support has been removed. This function is deprecated and unused.',
  );
}
