/*
  Warnings:

  - The primary key for the `Nota` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Nota_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Nota_id_seq";
