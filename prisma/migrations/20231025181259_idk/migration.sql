/*
  Warnings:

  - You are about to drop the column `done` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `llaveProceso` on the `Nota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "done",
DROP COLUMN "llaveProceso",
ADD COLUMN     "carpetaNumero" INTEGER;

-- CreateTable
CREATE TABLE "Carpeta" (
    "numero" SERIAL NOT NULL,
    "nombre" TEXT,
    "llaveProceso" TEXT,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
