/*
  Warnings:

  - A unique constraint covering the columns `[gamesPlayed]` on the table `PlayBadge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gamesWon]` on the table `WinBadge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "wins" DROP NOT NULL,
ALTER COLUMN "losses" DROP NOT NULL,
ALTER COLUMN "avatarId" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlayBadge_gamesPlayed_key" ON "PlayBadge"("gamesPlayed");

-- CreateIndex
CREATE UNIQUE INDEX "WinBadge_gamesWon_key" ON "WinBadge"("gamesWon");
