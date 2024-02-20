-- DropForeignKey
ALTER TABLE "Actor" DROP CONSTRAINT "Actor_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Parameters" DROP CONSTRAINT "Parameters_movieId_fkey";

-- AlterTable
ALTER TABLE "Actor" ALTER COLUMN "movieId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "genreId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parameters" ALTER COLUMN "movieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
