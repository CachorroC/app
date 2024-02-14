/*
  Warnings:

  - The primary key for the `Notifier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notifier` table. All the data in the column will be lost.
  - Added the required column `carpetaNumero` to the `Notifier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifier" DROP CONSTRAINT "Notifier_pkey",
DROP COLUMN "id",
ADD COLUMN     "carpetaNumero" INTEGER NOT NULL,
ADD CONSTRAINT "Notifier_pkey" PRIMARY KEY ("tipo", "carpetaNumero");
