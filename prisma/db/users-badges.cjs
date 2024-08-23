const prisma = require('./client.cjs');

const assignWinBadge = async(userId, winBadgeId) => {
  try {
    const { winBadges } = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        winBadges: {
          connect: {
            id: winBadgeId
          }
        }
      },
      include: {
        winBadges: true
      }  
    })
    return winBadges[0]?.name;
  } catch (error) {
    return error;
  }
}

const assignPlayBadge = async(userId, playBadgeId) => {
  try {
    const { playBadges } = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        playBadges: {
          connect: {
            id: playBadgeId
          }
        }
      },
      include: {
        playBadges: true
      }  
    })
    return playBadges[0]?.name;
  } catch (error) {
    return error;
  }
}

module.exports = { assignWinBadge, assignPlayBadge }