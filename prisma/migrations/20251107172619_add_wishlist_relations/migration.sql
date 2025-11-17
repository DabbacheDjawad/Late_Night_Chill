-- CreateTable
CREATE TABLE "_WishlistAnimes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WishlistAnimes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_WishlistMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WishlistMovies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_WishlistTvShows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WishlistTvShows_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_WishlistAnimes_B_index" ON "_WishlistAnimes"("B");

-- CreateIndex
CREATE INDEX "_WishlistMovies_B_index" ON "_WishlistMovies"("B");

-- CreateIndex
CREATE INDEX "_WishlistTvShows_B_index" ON "_WishlistTvShows"("B");

-- AddForeignKey
ALTER TABLE "_WishlistAnimes" ADD CONSTRAINT "_WishlistAnimes_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistAnimes" ADD CONSTRAINT "_WishlistAnimes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistMovies" ADD CONSTRAINT "_WishlistMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistMovies" ADD CONSTRAINT "_WishlistMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistTvShows" ADD CONSTRAINT "_WishlistTvShows_A_fkey" FOREIGN KEY ("A") REFERENCES "TvShow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistTvShows" ADD CONSTRAINT "_WishlistTvShows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
