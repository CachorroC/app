-- CreateTable
CREATE TABLE "Deudor" (
    "carpetaNumero" INTEGER NOT NULL,
    "cedula" TEXT NOT NULL,
    "direccion" TEXT,
    "email" TEXT,
    "id" INTEGER NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoApellido" TEXT,
    "segundoNombre" TEXT,
    "telCelular" TEXT,
    "telFijo" TEXT,

    CONSTRAINT "Deudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Codeudor" (
    "carpetaNumero" INTEGER NOT NULL,
    "cedula" TEXT,
    "direccion" TEXT,
    "id" INTEGER NOT NULL,
    "nombre" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Codeudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "capitalAdeudado" MONEY,
    "carpetaNumero" INTEGER NOT NULL,
    "departamento" TEXT,
    "despacho" TEXT,
    "entregaGarantiasAbogado" DATE,
    "etapaProcesal" TEXT,
    "expediente" TEXT,
    "fechaPresentacion" DATE[],
    "id" INTEGER NOT NULL,
    "mandamientoPago" DATE,
    "municipio" TEXT,
    "obligacion" TEXT[],
    "radicado" TEXT,
    "tipoProceso" "TipoProceso" NOT NULL DEFAULT 'SINGULAR',
    "vencimientoPagare" DATE[],

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "autoNotificado" TEXT,
    "demandaId" INTEGER,
    "certimail" BOOLEAN,
    "fisico" BOOLEAN,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedidasCautelares" (
    "demandaId" INTEGER,
    "fechaOrdenaMedida" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "medidaSolicitada" TEXT,

    CONSTRAINT "MedidasCautelares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifier" (
    "fechaAporta" TIMESTAMP(3),
    "fechaRecibido" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "notificacionId" INTEGER,
    "resultado" BOOLEAN,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Notifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_carpetaNumero_key" ON "Deudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Codeudor_carpetaNumero_key" ON "Codeudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Demanda_carpetaNumero_key" ON "Demanda"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Notificacion_demandaId_key" ON "Notificacion"("demandaId");

-- CreateIndex
CREATE UNIQUE INDEX "MedidasCautelares_demandaId_key" ON "MedidasCautelares"("demandaId");

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Codeudor" ADD CONSTRAINT "Codeudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedidasCautelares" ADD CONSTRAINT "MedidasCautelares_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "Demanda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifier" ADD CONSTRAINT "Notifier_notificacionId_fkey" FOREIGN KEY ("notificacionId") REFERENCES "Notificacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
