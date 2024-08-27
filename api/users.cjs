const express = require('express');
const router = express.Router();

const { createUser, getUser } = require('../prisma/db/users.cjs')

router.use(express.json())

router.post('/', async(req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await createUser(username, password, email);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
})

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