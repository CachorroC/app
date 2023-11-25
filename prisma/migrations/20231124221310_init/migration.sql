-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Terminados', 'LiosJuridicos', 'Bancolombia', 'Reintegra', 'Insolvencia', 'SinEspecificar', 'todos');

-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('BOGOTA', 'CUNDINAMARCA', 'META', 'ANTIOQUIA', 'ATLANTICO');

-- CreateEnum
CREATE TYPE "TipoProceso" AS ENUM ('HIPOTECARIO', 'PRENDARIO', 'SINGULAR', 'ACUMULADO');

-- CreateTable
CREATE TABLE "Carpeta" (
    "numero" INTEGER NOT NULL,
    "llaveProceso" TEXT,
    "nombre" TEXT NOT NULL,
    "idProcesos" INTEGER[],
    "category" "Category" NOT NULL DEFAULT 'SinEspecificar',
    "fecha" DATE,
    "revisado" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "terminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "Deudor" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT,
    "primerNombre" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "segundoApellido" TEXT,
    "direccion" TEXT,
    "email" TEXT,
    "telCelular" TEXT,
    "telFijo" TEXT,
    "carpetaNumero" INTEGER NOT NULL,

    CONSTRAINT "Deudor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pathname" TEXT,
    "carpetaNumero" INTEGER,
    "content" TEXT,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "dueDate" DATE,
    "carpetaNumero" INTEGER,
    "complete" BOOLEAN NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTarea" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "isComplete" BOOLEAN NOT NULL,
    "tareaId" INTEGER,

    CONSTRAINT "SubTarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actuacion" (
    "id" SERIAL NOT NULL,
    "isUltimaAct" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idRegActuacion" OID NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "consActuacion" INTEGER NOT NULL,
    "fechaActuacion" DATE NOT NULL,
    "actuacion" TEXT NOT NULL,
    "anotacion" TEXT,
    "fechaInicial" DATE,
    "fechaRegistro" DATE NOT NULL,
    "fechaFinal" DATE,
    "codRegla" TEXT NOT NULL,
    "conDocumentos" BOOLEAN NOT NULL,
    "cant" INTEGER NOT NULL,
    "idProceso" INTEGER,

    CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "id" SERIAL NOT NULL,
    "departamento" TEXT,
    "capitalAdeudado" MONEY,
    "entregaGarantiasAbogado" DATE,
    "tipoProceso" "TipoProceso" NOT NULL DEFAULT 'SINGULAR',
    "mandamientoPago" DATE,
    "etapaProcesal" TEXT,
    "fechaPresentacion" DATE,
    "municipio" TEXT,
    "obligacion" TEXT[],
    "radicado" TEXT,
    "vencimientoPagare" DATE[],
    "expediente" TEXT,
    "carpetaNumero" INTEGER NOT NULL,
    "despacho" TEXT,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Juzgado" (
    "id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Juzgado_pkey" PRIMARY KEY ("tipo")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "id" SERIAL NOT NULL,
    "idProceso" INTEGER NOT NULL,
    "idConexion" INTEGER NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "fechaProceso" DATE,
    "fechaUltimaActuacion" DATE,
    "despacho" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "sujetosProcesales" TEXT NOT NULL,
    "esPrivado" BOOLEAN NOT NULL,
    "cantFilas" INTEGER NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarpetaToJuzgado" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DemandaToJuzgado" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Carpeta_llaveProceso_key" ON "Carpeta"("llaveProceso");

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_cedula_key" ON "Deudor"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_carpetaNumero_key" ON "Deudor"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Demanda_carpetaNumero_key" ON "Demanda"("carpetaNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Proceso_idProceso_key" ON "Proceso"("idProceso");

-- CreateIndex
CREATE UNIQUE INDEX "_CarpetaToJuzgado_AB_unique" ON "_CarpetaToJuzgado"("A", "B");

-- CreateIndex
CREATE INDEX "_CarpetaToJuzgado_B_index" ON "_CarpetaToJuzgado"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandaToJuzgado_AB_unique" ON "_DemandaToJuzgado"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandaToJuzgado_B_index" ON "_DemandaToJuzgado"("B");

-- AddForeignKey
ALTER TABLE "Deudor" ADD CONSTRAINT "Deudor_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTarea" ADD CONSTRAINT "SubTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_llaveProceso_fkey" FOREIGN KEY ("llaveProceso") REFERENCES "Carpeta"("llaveProceso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_idProceso_fkey" FOREIGN KEY ("idProceso") REFERENCES "Proceso"("idProceso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_llaveProceso_fkey" FOREIGN KEY ("llaveProceso") REFERENCES "Carpeta"("llaveProceso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_despacho_fkey" FOREIGN KEY ("despacho") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Carpeta"("numero") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarpetaToJuzgado" ADD CONSTRAINT "_CarpetaToJuzgado_B_fkey" FOREIGN KEY ("B") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToJuzgado" ADD CONSTRAINT "_DemandaToJuzgado_A_fkey" FOREIGN KEY ("A") REFERENCES "Demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToJuzgado" ADD CONSTRAINT "_DemandaToJuzgado_B_fkey" FOREIGN KEY ("B") REFERENCES "Juzgado"("tipo") ON DELETE CASCADE ON UPDATE CASCADE;
