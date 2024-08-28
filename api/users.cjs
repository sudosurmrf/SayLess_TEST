const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { createUser, getUser, changePassword, changeEmail } = require('../prisma/db/users.cjs')
const { getCustomQuotes } = require('../prisma/db/quotes.cjs');
const { getWinBadges, getPlayBadges } = require('../prisma/db/users-badges.cjs');

router.use(express.json())

// middleware using jsonwebtoken
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Bad Token');
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    console.error(error);
    return res.status(403).send('Invalid Token');
  }
  return next();
};

// register
router.post('/register', async(req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await createUser(username, password, email);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

// login
router.get('/login', async(req, res, next) => {
  try {
    const { username, password } = req.body;
    const assignedToken = await getUser(username, password);
    res.json({ token: assignedToken });
  } catch (error) {
    next(error);
  }
});

// account page info
router.get('/userdetails', verifyToken, async(req, res, next) => {
  try {
    const user = req.user.username
    const customQuotes = await getCustomQuotes(req.user.userId);
    const userWinBadges = await getWinBadges(req.user.userId);
    const userPlayBadges = await getPlayBadges(req.user.userId);
    
    const accountInfo = {
      user,
      customQuotes,
      userWinBadges,
      userPlayBadges
  };

    res.send(accountInfo);
  } catch (error) {
    next(error);
  }
})

// change password
router.patch('/change-pw'), verifyToken, async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    await changePassword(req.user.id, newPassword);
    res.status(200).json({ message: 'Password Change Successful'});
  } catch (err) {
    res.status(500).json({ message: 'Password Change Error', error:err.message});
  };
};

// change email
router.patch('/change-email', verifyToken, async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    await changeEmail(req.user.id, newEmail);
    res.status(200).json({ message: 'Email Change Successful' });
  } catch (err) {
    res.status(500).json({ message: 'Email Change Failed', error: err.message });
  }
});


module.exports = router;