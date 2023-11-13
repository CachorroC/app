/*
  Warnings:

  - A unique constraint covering the columns `[carpetaNumero]` on the table `Actuacion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Actuacion_carpetaNumero_key" ON "Actuacion"("carpetaNumero");
