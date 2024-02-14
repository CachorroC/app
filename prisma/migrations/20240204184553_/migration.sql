/*
  Warnings:

  - The `mandamientoPago` column on the `Demanda` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Demanda" DROP COLUMN "mandamientoPago",
ADD COLUMN     "mandamientoPago" DATE[];
