/*
  Warnings:

  - You are about to drop the `Parameters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `years` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parameters" DROP CONSTRAINT "Parameters_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "years" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Parameters";
