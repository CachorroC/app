/*
  Warnings:

  - The primary key for the `Carpeta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Carpeta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarpetaToJuzgado" DROP CONSTRAINT "_CarpetaToJuzgado_A_fkey";

-- AlterTable
ALTER TABLE "Carpeta" DROP CONSTRAINT "Carpeta_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("numero");

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Carpeta"("numero") ON DELETE CASCADE ON UPDATE CASCADE;
