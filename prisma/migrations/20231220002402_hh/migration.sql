/*
  Warnings:

  - You are about to drop the column `expediente` on the `Demanda` table. All the data in the column will be lost.
  - You are about to drop the column `tipoProceso` on the `Demanda` table. All the data in the column will be lost.
  - Made the column `demandaId` on table `MedidasCautelares` required. This step will fail if there are existing NULL values in that column.
  - Made the column `demandaId` on table `Notificacion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MedidasCautelares" DROP CONSTRAINT "MedidasCautelares_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacion" DROP CONSTRAINT "Notificacion_demandaId_fkey";

-- AlterTable
ALTER TABLE "Demanda" DROP COLUMN "expediente",
DROP COLUMN "tipoProceso",
ADD COLUMN     "llaveProceso" TEXT;

-- AlterTable
ALTER TABLE "MedidasCautelares" ALTER COLUMN "demandaId" SET NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "MedidasCautelares_id_seq";

-- AlterTable
ALTER TABLE "Notificacion" ALTER COLUMN "demandaId" SET NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Notificacion_id_seq";

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedidasCautelares" ADD CONSTRAINT "MedidasCautelares_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
