/*
  Warnings:

  - You are about to drop the column `image` on the `Deck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "image";
