/*
  Warnings:

  - The primary key for the `Actuacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Actuacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actuacion" DROP CONSTRAINT "Actuacion_pkey",
DROP COLUMN "id",
ALTER COLUMN "idRegActuacion" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("idRegActuacion");
