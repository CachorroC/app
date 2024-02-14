/*
  Warnings:

  - The `capitalAdeudado` column on the `Demanda` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Demanda" DROP COLUMN "capitalAdeudado",
ADD COLUMN     "capitalAdeudado" MONEY;
