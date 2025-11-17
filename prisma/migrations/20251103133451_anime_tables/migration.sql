-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "malId" INTEGER NOT NULL,
    "synopsis" TEXT,
    "background" TEXT,
    "score" DOUBLE PRECISION,
    "rank" INTEGER,
    "popularity" INTEGER,
    "members" INTEGER,
    "favorites" INTEGER,
    "episodes" INTEGER,
    "status" TEXT,
    "rating" TEXT,
    "season" TEXT,
    "year" INTEGER,
    "type" TEXT,
    "duration" TEXT,
    "source" TEXT,
    "airedFrom" TIMESTAMP(3),
    "airedTo" TIMESTAMP(3),
    "airedString" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeTitle" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "AnimeTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeImage" (
    "id" SERIAL NOT NULL,
    "jpgUrl" TEXT NOT NULL,
    "webpUrl" TEXT,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "AnimeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "youtubeId" TEXT,
    "embedUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "smallImageUrl" TEXT,
    "mediumImageUrl" TEXT,
    "maximumImageUrl" TEXT,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "Trailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeGenre" (
    "animeId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "AnimeGenre_pkey" PRIMARY KEY ("animeId","genreId")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeTheme" (
    "animeId" TEXT NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "AnimeTheme_pkey" PRIMARY KEY ("animeId","themeId")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeStudio" (
    "animeId" TEXT NOT NULL,
    "studioId" INTEGER NOT NULL,

    CONSTRAINT "AnimeStudio_pkey" PRIMARY KEY ("animeId","studioId")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeProducer" (
    "animeId" TEXT NOT NULL,
    "producerId" INTEGER NOT NULL,

    CONSTRAINT "AnimeProducer_pkey" PRIMARY KEY ("animeId","producerId")
);

-- CreateTable
CREATE TABLE "Licensor" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Licensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeLicensor" (
    "animeId" TEXT NOT NULL,
    "licensorId" INTEGER NOT NULL,

    CONSTRAINT "AnimeLicensor_pkey" PRIMARY KEY ("animeId","licensorId")
);

-- CreateTable
CREATE TABLE "AnimeEpisode" (
    "id" SERIAL NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_japanese" TEXT NOT NULL,
    "title_romanji" TEXT NOT NULL,
    "aired" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "filler" BOOLEAN NOT NULL,
    "recap" BOOLEAN NOT NULL,
    "forum_url" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "AnimeEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCharacter" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "role" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "AnimeCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceActor" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER,
    "name" TEXT,
    "url" TEXT,
    "images" JSONB,
    "language" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "VoiceActor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopCharacter" (
    "id" SERIAL NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nicknames" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "favorites" INTEGER NOT NULL,
    "about" TEXT,
    "rank" INTEGER,
    "images" JSONB NOT NULL,

    CONSTRAINT "TopCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_malId_key" ON "Anime"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeImage_animeId_key" ON "AnimeImage"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Trailer_animeId_key" ON "Trailer"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_malId_key" ON "Genre"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_malId_key" ON "Theme"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_malId_key" ON "Studio"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_malId_key" ON "Producer"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "Licensor_malId_key" ON "Licensor"("malId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeEpisode_mal_id_key" ON "AnimeEpisode"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeCharacter_characterId_key" ON "AnimeCharacter"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "TopCharacter_mal_id_key" ON "TopCharacter"("mal_id");

-- AddForeignKey
ALTER TABLE "AnimeTitle" ADD CONSTRAINT "AnimeTitle_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeImage" ADD CONSTRAINT "AnimeImage_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeTheme" ADD CONSTRAINT "AnimeTheme_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeTheme" ADD CONSTRAINT "AnimeTheme_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStudio" ADD CONSTRAINT "AnimeStudio_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStudio" ADD CONSTRAINT "AnimeStudio_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeProducer" ADD CONSTRAINT "AnimeProducer_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeProducer" ADD CONSTRAINT "AnimeProducer_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeLicensor" ADD CONSTRAINT "AnimeLicensor_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeLicensor" ADD CONSTRAINT "AnimeLicensor_licensorId_fkey" FOREIGN KEY ("licensorId") REFERENCES "Licensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeEpisode" ADD CONSTRAINT "AnimeEpisode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCharacter" ADD CONSTRAINT "AnimeCharacter_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceActor" ADD CONSTRAINT "VoiceActor_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "AnimeCharacter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
