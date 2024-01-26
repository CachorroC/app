-- AlterTable
ALTER TABLE "Factura" ADD COLUMN     "carpetaNumero" INTEGER;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;
