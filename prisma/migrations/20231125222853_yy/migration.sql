-- DropForeignKey
ALTER TABLE "Actuacion" DROP CONSTRAINT "Actuacion_llaveProceso_fkey";

-- DropIndex
DROP INDEX "Deudor_cedula_key";

-- AlterTable
ALTER TABLE "Actuacion" ADD COLUMN     "carpetaNumero" INTEGER;

-- AlterTable
ALTER TABLE "Carpeta" ADD COLUMN     "idRegUltimaAct" INTEGER;

-- AddForeignKey
ALTER TABLE "Carpeta" ADD CONSTRAINT "Carpeta_idRegUltimaAct_fkey" FOREIGN KEY ("idRegUltimaAct") REFERENCES "Actuacion"("idRegActuacion") ON DELETE SET NULL ON UPDATE CASCADE;
