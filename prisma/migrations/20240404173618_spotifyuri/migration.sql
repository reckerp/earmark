/*
  Warnings:

  - Added the required column `spotify_uri` to the `marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "marks" ADD COLUMN     "spotify_uri" TEXT NOT NULL;
