const express = require('express');
const router = express.Router();

const { getWinBadges, getPlayBadges } = require('../prisma/db/users-badges.cjs');

router.get('/:id', async(req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const winBadges = await getWinBadges(id);
    const playBadges = await getPlayBadges(id);
    
    const winAndPlayBadges = {
      winBadges,
      playBadges
    };
    
    res.send(winAndPlayBadges);

  } catch (error) {
    next(error);
  }
})

module.exports = router;