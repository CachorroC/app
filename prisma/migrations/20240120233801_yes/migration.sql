-- CreateTable
CREATE TABLE "Factura" (
    "id" TEXT NOT NULL,
    "facturaElectronica" TEXT,
    "secondaryFactura" JSONB,
    "ciudad" TEXT NOT NULL,
    "dv" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "nombreComercial" TEXT,
    "direccion" TEXT NOT NULL,
    "valorBase" MONEY NOT NULL,
    "hasOtroImp" BOOLEAN NOT NULL DEFAULT false,
    "hasIva" BOOLEAN NOT NULL DEFAULT false,
    "hasIcui" BOOLEAN NOT NULL DEFAULT false,
    "hasImpoConsumo" BOOLEAN NOT NULL DEFAULT false,
    "nit" INTEGER NOT NULL,
    "valorIva" MONEY NOT NULL,
    "valorOtroImp" MONEY NOT NULL,
    "valorTotal" MONEY NOT NULL,
    "concepto" TEXT NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_nit_fkey" FOREIGN KEY ("nit") REFERENCES "EmisorDeFactura"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;
