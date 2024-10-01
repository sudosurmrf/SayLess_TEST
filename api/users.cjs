const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { createUser, getUser, changePassword, changeEmail, getUserAcctDetails, userWin, userLose } = require('../prisma/db/users.cjs')
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
      if (error === `The username is already in use. Please choose a different one.`) {
        res.status(409).send({ error });
      }
      next(error);
  }
});

// login
router.post('/login', async(req, res, next) => {
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
    const userInfo = await getUserAcctDetails(req.user.userId)
    const customQuotes = await getCustomQuotes(req.user.userId);
    const userWinBadges = await getWinBadges(req.user.userId);
    const userPlayBadges = await getPlayBadges(req.user.userId);
    
    const accountInfo = {
      userInfo,
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
router.patch('/change-pw', verifyToken, async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    await changePassword(req.user.userId, newPassword);
    res.status(200).json({ message: 'Password Change Successful'});
  } catch (err) {
    res.status(500).json({ message: 'Password Change Error', error:err.message});
  };
});

// change email
router.patch('/change-email', verifyToken, async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const updatedAndCensoredEmail = await changeEmail(req.user.userId, newEmail);
    res.status(200).json({ updatedAndCensoredEmail });
  } catch (err) {
    res.status(500).json({ message: 'Email Change Failed', error: err.message });
  }
});

// add win
router.patch('/player-win', verifyToken, async (req, res, next) => {
  try {
    await userWin(req.user.userId);
    res.status(200).json({ message: 'Win added to stats' });
  } catch (error) {
    next(error);
  }
});

//add loss
router.patch('/player-lose', verifyToken, async (req, res, next) => {
  try {
    await userLose(req.user.userId);
    res.status(200).json({ message: 'Loss added to stats' });
  } catch (error) {
    next(error);
  }
})

module.exports = router;