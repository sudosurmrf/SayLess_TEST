const express = require('express');
const router = express.Router();

const { getCustomQuotes } = require('../prisma/db/quotes.cjs')

router.get('/:id', async(req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const customQuotes = await getCustomQuotes(id);
    res.send(customQuotes);
  } catch (error) {
    next(error);
  }
}

)

module.exports = router;