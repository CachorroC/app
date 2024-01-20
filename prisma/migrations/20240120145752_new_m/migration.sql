/*
  Warnings:

  - You are about to drop the `GeneradorDeFactura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GeneradorDeFactura";

-- CreateTable
CREATE TABLE "EmisorDeFactura" (
    "nit" INTEGER NOT NULL,
    "dv" INTEGER NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "nombreComercial" TEXT,
    "direccion" TEXT,
    "correo" TEXT,
    "telefono" INTEGER,
    "actividadEconomica" TEXT,
    "regimenFiscal" TEXT,
    "responsabilidadTributaria" TEXT,
    "tipoContribuyente" TEXT NOT NULL DEFAULT 'Juridica',
    "ciudad" TEXT NOT NULL DEFAULT 'Bogota',

    CONSTRAINT "EmisorDeFactura_pkey" PRIMARY KEY ("nit")
);
