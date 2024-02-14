/*
  Warnings:

  - The `category` column on the `Carpeta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipoProceso` column on the `Carpeta` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Carpeta" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'SinEspecificar',
DROP COLUMN "tipoProceso",
ADD COLUMN     "tipoProceso" TEXT NOT NULL DEFAULT 'SINGULAR';
