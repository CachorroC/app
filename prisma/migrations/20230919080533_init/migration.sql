/*
  Warnings:

  - Made the column `date` on table `Nota` required. This step will fail if there are existing NULL values in that column.
  - Made the column `done` on table `Nota` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pathname` on table `Nota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nota" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "done" SET NOT NULL,
ALTER COLUMN "pathname" SET NOT NULL;
