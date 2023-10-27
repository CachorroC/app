/*
  Warnings:

  - The primary key for the `Carpeta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Carpeta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Terminados', 'LiosJuridicos', 'Bancolombia', 'Reintegra', 'Insolvencia');

-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('BOGOTA', 'CUNDINAMARCA', 'META', 'ANTIOQUIA', 'ATLANTICO');

-- CreateEnum
CREATE TYPE "TipoProceso" AS ENUM ('HIPOTECARIO', 'PRENDARIO', 'SINGULAR', 'ACUMULADO', 'PRENDARO', 'HIPOTECARIA', 'HIPOTECARO', 'SOACHA');

-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_carpetaNumero_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Carpeta" DROP CONSTRAINT "Carpeta_pkey",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "cc" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "idProcesos" INTEGER[],
ALTER COLUMN "numero" DROP DEFAULT,
ADD CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Carpeta_numero_seq";

-- AlterTable
ALTER TABLE "Nota" ALTER COLUMN "pathname" DROP NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Tarea";

-- DropEnum
DROP TYPE "Abogado";

-- CreateTable
CREATE TABLE "Actuacion" (
    "idRegActuacion" INTEGER NOT NULL,
    "idProceso" BIGINT NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "consActuacion" INTEGER NOT NULL,
    "fechaActuacion" TIMESTAMP(3) NOT NULL,
    "actuacion" TEXT NOT NULL,
    "anotacion" TEXT,
    "fechaInicial" TIMESTAMP(3),
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "fechaFinal" TIMESTAMP(3),
    "codRegla" TEXT NOT NULL,
    "conDocumentos" BOOLEAN NOT NULL,
    "can" INTEGER NOT NULL,

    CONSTRAINT "Actuacion_pkey" PRIMARY KEY ("idProceso")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "departamento" "Departamento" NOT NULL,
    "capitalAdeudado" BIGINT NOT NULL,
    "entregaGarantiasAbogado" TIMESTAMP(3) NOT NULL,
    "etapaProcesal" TEXT NOT NULL,
    "fechaPresentacion" TIMESTAMP(3) NOT NULL,
    "municipio" TEXT NOT NULL,
    "obligacion" TEXT[],
    "radicado" TEXT NOT NULL,
    "vencimientoPagare" TIMESTAMP(3) NOT NULL,
    "expediente" TEXT NOT NULL,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("expediente")
);

-- CreateTable
CREATE TABLE "Deudor" (
    "cedula" BIGINT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT,
    "email" TEXT,
    "direccion" TEXT,

    CONSTRAINT "Deudor_pkey" PRIMARY KEY ("cedula")
);

-- CreateTable
CREATE TABLE "Juzgado" (
    "id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "demandaExpediente" TEXT,

    CONSTRAINT "Juzgado_pkey" PRIMARY KEY ("tipo")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "idProceso" BIGINT NOT NULL,
    "idConexion" INTEGER NOT NULL,
    "llaveProceso" TEXT NOT NULL,
    "fechaProceso" TIMESTAMP(3) NOT NULL,
    "fechaUltimaActuacion" TIMESTAMP(3) NOT NULL,
    "despacho" TEXT NOT NULL,
    "departamento" "Departamento" NOT NULL,
    "sujetosProcesales" TEXT NOT NULL,
    "esPrivado" BOOLEAN NOT NULL,
    "cantFilas" INTEGER NOT NULL,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("idProceso")
);

-- CreateTable
CREATE TABLE "Telefono" (
    "fijo" INTEGER NOT NULL,
    "celular" INTEGER NOT NULL,
    "cedula" BIGINT NOT NULL,

    CONSTRAINT "Telefono_pkey" PRIMARY KEY ("cedula")
);

-- CreateTable
CREATE TABLE "_DemandaToProceso" (
    "A" TEXT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Demanda_radicado_key" ON "Demanda"("radicado");

-- CreateIndex
CREATE UNIQUE INDEX "Deudor_cedula_key" ON "Deudor"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandaToProceso_AB_unique" ON "_DemandaToProceso"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandaToProceso_B_index" ON "_DemandaToProceso"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Carpeta_id_key" ON "Carpeta"("id");

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_carpetaNumero_fkey" FOREIGN KEY ("carpetaNumero") REFERENCES "Carpeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actuacion" ADD CONSTRAINT "Actuacion_idProceso_fkey" FOREIGN KEY ("idProceso") REFERENCES "Proceso"("idProceso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juzgado" ADD CONSTRAINT "Juzgado_demandaExpediente_fkey" FOREIGN KEY ("demandaExpediente") REFERENCES "Demanda"("expediente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proceso" ADD CONSTRAINT "Proceso_despacho_fkey" FOREIGN KEY ("despacho") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefono" ADD CONSTRAINT "Telefono_cedula_fkey" FOREIGN KEY ("cedula") REFERENCES "Deudor"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToProceso" ADD CONSTRAINT "_DemandaToProceso_A_fkey" FOREIGN KEY ("A") REFERENCES "Demanda"("expediente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToProceso" ADD CONSTRAINT "_DemandaToProceso_B_fkey" FOREIGN KEY ("B") REFERENCES "Proceso"("idProceso") ON DELETE CASCADE ON UPDATE CASCADE;
