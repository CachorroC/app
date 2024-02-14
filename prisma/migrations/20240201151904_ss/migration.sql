/*
  Warnings:

  - The `autoNotificado` column on the `Notificacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notificacion" DROP COLUMN "autoNotificado",
ADD COLUMN     "autoNotificado" DATE;
