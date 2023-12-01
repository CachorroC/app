/*
  Warnings:

  - You are about to drop the `_DemandaToJuzgado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DemandaToJuzgado" DROP CONSTRAINT "_DemandaToJuzgado_A_fkey";

-- DropForeignKey
ALTER TABLE "_DemandaToJuzgado" DROP CONSTRAINT "_DemandaToJuzgado_B_fkey";

-- DropTable
DROP TABLE "_DemandaToJuzgado";

-- CreateTable
CREATE TABLE "JuzgadoDemanda" (
    "demandaNumero" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "JuzgadoDemanda_pkey" PRIMARY KEY ("demandaNumero","tipo")
);

-- AddForeignKey
ALTER TABLE "JuzgadoDemanda" ADD CONSTRAINT "JuzgadoDemanda_demandaNumero_fkey" FOREIGN KEY ("demandaNumero") REFERENCES "Demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JuzgadoDemanda" ADD CONSTRAINT "JuzgadoDemanda_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "Juzgado"("tipo") ON DELETE RESTRICT ON UPDATE CASCADE;
