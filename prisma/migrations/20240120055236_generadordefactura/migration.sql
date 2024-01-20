-- CreateTable
CREATE TABLE "GeneradorDeFactura" (
    "nit" INTEGER NOT NULL,
    "dv" INTEGER NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "direccion" TEXT,
    "ciudad" TEXT NOT NULL DEFAULT 'Bogota',

    CONSTRAINT "GeneradorDeFactura_pkey" PRIMARY KEY ("nit")
);
