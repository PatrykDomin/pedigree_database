/*
  Warnings:

  - Added the required column `breed` to the `Dog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dog" ADD COLUMN     "breed" TEXT NOT NULL;
