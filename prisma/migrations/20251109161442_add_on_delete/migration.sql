-- DropForeignKey
ALTER TABLE "public"."AnimeCharacter" DROP CONSTRAINT "AnimeCharacter_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeEpisode" DROP CONSTRAINT "AnimeEpisode_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeGenre" DROP CONSTRAINT "AnimeGenre_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeImage" DROP CONSTRAINT "AnimeImage_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeLicensor" DROP CONSTRAINT "AnimeLicensor_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeProducer" DROP CONSTRAINT "AnimeProducer_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeStudio" DROP CONSTRAINT "AnimeStudio_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeTheme" DROP CONSTRAINT "AnimeTheme_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnimeTitle" DROP CONSTRAINT "AnimeTitle_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MovieDetails" DROP CONSTRAINT "MovieDetails_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MovieGenre" DROP CONSTRAINT "MovieGenre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trailer" DROP CONSTRAINT "Trailer_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TvShowGenre" DROP CONSTRAINT "TvShowGenre_tvShowId_fkey";

-- AddForeignKey
ALTER TABLE "AnimeTitle" ADD CONSTRAINT "AnimeTitle_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeImage" ADD CONSTRAINT "AnimeImage_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeTheme" ADD CONSTRAINT "AnimeTheme_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStudio" ADD CONSTRAINT "AnimeStudio_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeProducer" ADD CONSTRAINT "AnimeProducer_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeLicensor" ADD CONSTRAINT "AnimeLicensor_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeEpisode" ADD CONSTRAINT "AnimeEpisode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCharacter" ADD CONSTRAINT "AnimeCharacter_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDetails" ADD CONSTRAINT "MovieDetails_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvShowGenre" ADD CONSTRAINT "TvShowGenre_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
