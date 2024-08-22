const prisma = require('./client.cjs');

const createWinBadge = async(name, gamesWon) => {
  try { 
    await prisma.winBadge.create({
      data: {
        name: name,
        gamesWon: gamesWon
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const createPlayBadge = async(name, gamesPlayed) => {
  try { 
    await prisma.playBadge.create({
      data: {
        name: name,
        gamesPlayed: gamesPlayed
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createWinBadge, createPlayBadge }