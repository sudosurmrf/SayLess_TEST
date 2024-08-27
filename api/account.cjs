const express = require('express');
const router = express.Router();

const { getUser } = require('../prisma/db/users.cjs');
const { getCustomQuotes } = require('../prisma/db/quotes.cjs');
const { getWinBadges, getPlayBadges } = require('../prisma/db/users-badges.cjs');

router.get('/:id', async(req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);

    const user = await getUser(id);
    const customQuotes = await getCustomQuotes(id);
    const winBadges = await getWinBadges(id);
    const playBadges = await getPlayBadges(id);
    
    const accountInfo = {
      user,
      customQuotes,
      winBadges,
      playBadges
  };
    
    res.send(accountInfo);
  } catch (error) {
    next(error);
  }
})

module.exports = router;