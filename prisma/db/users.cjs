const prisma = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createUser = async(username, password, email) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 5);
    
    await prisma.user.create({
      data: {
        username: username,
        password: encryptedPassword,
        email: email
      }
    })
    return { success: true, username: username };
  } catch (error) {
    return (`Couldn't create user`, error.message);
  }
}

const getUser = async(usernameToTry, passwordToTry) => {
try {  
  const { id, username, password } = await prisma.user.findUnique({
    where: {
      username: usernameToTry
    },
    select: {
      id: true,
      username: true,
      password: true
    }
  })

  const passwordMatch = await bcrypt.compare(passwordToTry, password);

  if (username && passwordMatch) {
    const assignedToken = await jwt.sign({ userId: id, username: username }, process.env.JWT_SECRET);
    return (assignedToken);
  } else {
    throw new Error('Either username or password do not match our records.')
  }
} catch (error) {
  return 'Either username or password do not match our records.';
}
}

module.exports = { createUser, getUser }
