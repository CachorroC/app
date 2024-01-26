/*
  Warnings:

  - You are about to drop the column `content` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Nota` table. All the data in the column will be lost.
  - The `content` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `text` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "title",
ADD COLUMN     "dueDate" DATE,
ADD COLUMN     "extraContent" TEXT,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
ADD COLUMN     "content" TEXT[],
ALTER COLUMN "dueDate" SET NOT NULL;
