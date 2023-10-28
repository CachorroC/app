/*
  Warnings:

  - You are about to drop the `TareasEnNotas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isComplete` to the `Tarea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Tarea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TareasEnNotas" DROP CONSTRAINT "TareasEnNotas_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TareasEnNotas" DROP CONSTRAINT "TareasEnNotas_postId_fkey";

-- AlterTable
ALTER TABLE "Tarea" ADD COLUMN     "isComplete" BOOLEAN NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "TareasEnNotas";

-- CreateTable
CREATE TABLE "SubTarea" (
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "isComplete" BOOLEAN NOT NULL,
    "tareaId" INTEGER,

    CONSTRAINT "SubTarea_pkey" PRIMARY KEY ("text")
);

-- AddForeignKey
ALTER TABLE "SubTarea" ADD CONSTRAINT "SubTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
