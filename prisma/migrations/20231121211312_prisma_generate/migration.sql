/*
  Warnings:

  - Added the required column `updatedAt` to the `Carpeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carpeta" ADD COLUMN     "revisado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
