/*
  Warnings:

  - Made the column `capitalAdeudado` on table `Demanda` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Demanda" ALTER COLUMN "capitalAdeudado" SET NOT NULL,
ALTER COLUMN "capitalAdeudado" SET DEFAULT 1000000;

-- AlterTable
ALTER TABLE "Deudor" ADD COLUMN     "tel" JSONB;
