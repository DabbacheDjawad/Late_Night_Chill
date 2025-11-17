-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('anime', 'movie', 'tv');

-- CreateTable
CREATE TABLE "WatchProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "mediaId" TEXT NOT NULL,
    "title" TEXT,
    "image" TEXT,
    "currentTime" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER,
    "lastWatched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WatchProgress_userId_lastWatched_idx" ON "WatchProgress"("userId", "lastWatched");

-- CreateIndex
CREATE UNIQUE INDEX "WatchProgress_userId_mediaType_mediaId_key" ON "WatchProgress"("userId", "mediaType", "mediaId");

-- AddForeignKey
ALTER TABLE "WatchProgress" ADD CONSTRAINT "WatchProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
