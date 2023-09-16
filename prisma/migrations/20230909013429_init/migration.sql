-- CreateEnum
CREATE TYPE "Abogado" AS ENUM ('Melissa', 'Camilo', 'Fernando', 'Carmen');

-- CreateTable
CREATE TABLE "Tarea" (
    "text" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "done" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "abogado" "Abogado" NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarea_id_key" ON "Tarea"("id");
