const express = require('express');
const router = express.Router();

const { createCustomQuote, getCustomQuotes } = require('../prisma/db/quotes.cjs')

router.use(express.json())

router.post('/', async(req, res, next) => {
  try {
    let { text, userId } = req.body;
    userId = Number(userId);
    const newQuote = await createCustomQuote(text, userId);
    res.send(newQuote);
  } catch (error) {
    next(error);
  }
})

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