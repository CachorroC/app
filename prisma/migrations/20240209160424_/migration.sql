/*
  Warnings:

  - The primary key for the `Nota` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_pkey",
ADD CONSTRAINT "Nota_pkey" PRIMARY KEY ("text");
