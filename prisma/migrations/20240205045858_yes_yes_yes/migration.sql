/*
  Warnings:

  - You are about to drop the column `valorLiquidacion` on the `Demanda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Demanda" DROP COLUMN "valorLiquidacion",
ADD COLUMN     "avaluo" MONEY NOT NULL DEFAULT 1000,
ADD COLUMN     "liquidacion" MONEY NOT NULL DEFAULT 1000;
