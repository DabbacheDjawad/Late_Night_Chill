-- DropForeignKey
ALTER TABLE "public"."WatchProgress" DROP CONSTRAINT "WatchProgress_userId_fkey";

-- AddForeignKey
ALTER TABLE "WatchProgress" ADD CONSTRAINT "WatchProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
