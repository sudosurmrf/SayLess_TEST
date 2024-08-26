const express = require('express');
const router = express.Router();

const { getUser } = require('../prisma/db/users.cjs')

router.get('/:id', async(req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const foundUser = await getUser(id);
    res.send(foundUser);
  } catch (error) {
    next(error);
  }
})

module.exports = router;