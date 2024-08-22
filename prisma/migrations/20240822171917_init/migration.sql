-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "avatarId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WinBadge" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gamesWon" INTEGER NOT NULL,

    CONSTRAINT "WinBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayBadge" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gamesPlayed" INTEGER NOT NULL,

    CONSTRAINT "PlayBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomQuote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CustomQuote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomQuote" ADD CONSTRAINT "CustomQuote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
