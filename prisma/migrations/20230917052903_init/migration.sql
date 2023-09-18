-- CreateTable
CREATE TABLE "Nota" (
    "text" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "done" BOOLEAN,
    "pathname" TEXT,
    "llaveProceso" TEXT,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nota_id_key" ON "Nota"("id");
