/*
  Warnings:

  - Made the column `carpetaNumero` on table `Codeudor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carpetaNumero` on table `Demanda` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carpetaNumero` on table `Deudor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `demandaId` on table `MedidasCautelares` required. This step will fail if there are existing NULL values in that column.
  - Made the column `demandaId` on table `Notificacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notificacionId` on table `Notifier` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Codeudor" DROP CONSTRAINT "Codeudor_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "Demanda" DROP CONSTRAINT "Demanda_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "Deudor" DROP CONSTRAINT "Deudor_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "MedidasCautelares" DROP CONSTRAINT "MedidasCautelares_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacion" DROP CONSTRAINT "Notificacion_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "Notifier" DROP CONSTRAINT "Notifier_notificacionId_fkey";

-- AlterTable
ALTER TABLE "Codeudor" ALTER COLUMN "carpetaNumero" SET NOT NULL;

-- AlterTable
ALTER TABLE "Demanda" ALTER COLUMN "carpetaNumero" SET NOT NULL;

-- AlterTable
ALTER TABLE "Deudor" ALTER COLUMN "carpetaNumero" SET NOT NULL;

-- AlterTable
ALTER TABLE "MedidasCautelares" ALTER COLUMN "demandaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notificacion" ALTER COLUMN "demandaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notifier" ALTER COLUMN "notificacionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Codeudor" ADD CONSTRAINT "Codeudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedidasCautelares" ADD CONSTRAINT "MedidasCautelares_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifier" ADD CONSTRAINT "Notifier_notificacionId_fkey" FOREIGN KEY ("notificacionId") REFERENCES "Notificacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
