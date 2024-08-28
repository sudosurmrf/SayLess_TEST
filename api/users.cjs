const express = require('express');
const router = express.Router();

const { createUser, getUser, changePassword, changeEmail } = require('../prisma/db/users.cjs')

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

// change password
router.patch('/change-pw'), verifyToken, async (req, res, next) => {
  try {
    const user = await getUserByToken(req.user);
    const { newPassword } = req.body;
    await changePassword(user.id, newPassword);
    res.status(200).json({ message: 'Password Change Successful'});
  } catch (err) {
    res.status(500).json({ message: 'Password Change Error', error:err.message});
  };
};

// change email
router.patch('/api/users/change-email', verifyToken, async (req, res, next) => {
  try {
    const user = await getUserByToken(req.user);
    const { newEmail } = req.body;
    await changeEmail(user.id, newEmail);
    res.status(200).json({ message: 'Email Change Successful' });
  } catch (err) {
    res.status(500).json({ message: 'Email Change Failed', error: err.message });
  }
});


module.exports = router;