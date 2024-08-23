-- CreateTable
CREATE TABLE "_UserToWinBadge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayBadgeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWinBadge_AB_unique" ON "_UserToWinBadge"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWinBadge_B_index" ON "_UserToWinBadge"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayBadgeToUser_AB_unique" ON "_PlayBadgeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayBadgeToUser_B_index" ON "_PlayBadgeToUser"("B");

-- AddForeignKey
ALTER TABLE "_UserToWinBadge" ADD CONSTRAINT "_UserToWinBadge_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWinBadge" ADD CONSTRAINT "_UserToWinBadge_B_fkey" FOREIGN KEY ("B") REFERENCES "WinBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayBadgeToUser" ADD CONSTRAINT "_PlayBadgeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayBadgeToUser" ADD CONSTRAINT "_PlayBadgeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
