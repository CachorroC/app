-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "carpetaId" INTEGER,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TareasEnNotas" (
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TareasEnNotas_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarea_id_key" ON "Tarea"("id");

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_carpetaId_fkey" FOREIGN KEY ("carpetaId") REFERENCES "Carpeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareasEnNotas" ADD CONSTRAINT "TareasEnNotas_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Nota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareasEnNotas" ADD CONSTRAINT "TareasEnNotas_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Tarea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
