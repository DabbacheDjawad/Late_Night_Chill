/*
  Warnings:

  - You are about to drop the `_UserFavourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_UserFavourites" DROP CONSTRAINT "_UserFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserFavourites" DROP CONSTRAINT "_UserFavourites_B_fkey";

-- DropTable
DROP TABLE "public"."_UserFavourites";

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "video" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "MovieDetails" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "runtime" INTEGER NOT NULL,
    "tagline" TEXT,
    "status" TEXT NOT NULL,
    "movieId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDetailsGenre" (
    "movieDetailsId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "MovieDetailsGenre_pkey" PRIMARY KEY ("movieDetailsId","genreId")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "firstAirDate" TIMESTAMP(3) NOT NULL,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "voteCount" INTEGER,
    "popularity" DOUBLE PRECISION,
    "originalLanguage" TEXT,
    "originalName" TEXT,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "originCountries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShowGenre" (
    "tvShowId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "TvShowGenre_pkey" PRIMARY KEY ("tvShowId","genreId")
);

-- CreateTable
CREATE TABLE "_UserAnimeFavourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserAnimeFavourites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserMovieFavourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserMovieFavourites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserTvFavourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserTvFavourites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieDetails_tmdbId_key" ON "MovieDetails"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieDetails_movieId_key" ON "MovieDetails"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_tmdbId_key" ON "TvShow"("tmdbId");

-- CreateIndex
CREATE INDEX "_UserAnimeFavourites_B_index" ON "_UserAnimeFavourites"("B");

-- CreateIndex
CREATE INDEX "_UserMovieFavourites_B_index" ON "_UserMovieFavourites"("B");

-- CreateIndex
CREATE INDEX "_UserTvFavourites_B_index" ON "_UserTvFavourites"("B");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDetails" ADD CONSTRAINT "MovieDetails_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDetailsGenre" ADD CONSTRAINT "MovieDetailsGenre_movieDetailsId_fkey" FOREIGN KEY ("movieDetailsId") REFERENCES "MovieDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDetailsGenre" ADD CONSTRAINT "MovieDetailsGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvShowGenre" ADD CONSTRAINT "TvShowGenre_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvShowGenre" ADD CONSTRAINT "TvShowGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnimeFavourites" ADD CONSTRAINT "_UserAnimeFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAnimeFavourites" ADD CONSTRAINT "_UserAnimeFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMovieFavourites" ADD CONSTRAINT "_UserMovieFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMovieFavourites" ADD CONSTRAINT "_UserMovieFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTvFavourites" ADD CONSTRAINT "_UserTvFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "TvShow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTvFavourites" ADD CONSTRAINT "_UserTvFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
