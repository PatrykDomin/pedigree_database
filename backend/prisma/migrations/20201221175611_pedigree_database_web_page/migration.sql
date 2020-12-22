/*
  Warnings:

  - You are about to drop the column `contactPage` on the `Breeding` table. All the data in the column will be lost.
  - Added the required column `webPage` to the `Breeding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Breeding" DROP COLUMN "contactPage",
ADD COLUMN     "webPage" TEXT NOT NULL;
