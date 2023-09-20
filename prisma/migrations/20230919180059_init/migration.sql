/*
  Warnings:

  - Made the column `date` on table `Nota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nota" ALTER COLUMN "date" SET NOT NULL;
