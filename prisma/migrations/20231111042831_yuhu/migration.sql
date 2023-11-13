/*
  Warnings:

  - You are about to drop the column `nombre` on the `Deudor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deudor" DROP COLUMN "nombre",
ALTER COLUMN "telCelular" SET DATA TYPE BIGINT,
ALTER COLUMN "telFijo" SET DATA TYPE BIGINT;
