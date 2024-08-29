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

    if (!username){
      throw new Error ('Username not found.')
    }

    const passwordMatch = await bcrypt.compare(passwordToTry, password);

    if (passwordMatch) {
      const assignedToken = jwt.sign({ userId: id, username: username }, process.env.JWT_SECRET);
      console.log(assignedToken);
      return assignedToken

    } else {
      throw new Error('Could not assign token.')
    }
  } catch (error) {
    return 'Either username or password do not match our records.';
  }
}

const getUserAcctDetails = async (userId) => {
  try {  
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        username: true,
        wins: true,
        losses: true,
        avatarId: true,
      }
    })

    return userDetails
  } catch (error){
    return (`Unable to retrieve user information`, error.message);
  }
}

const changeEmail = async(userId, newEmail) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        email: newEmail
      }
    })
  } catch (error) {
    return (`Couldn't change email`, error.message);
  }
}

module.exports = { createUser, getUser, changeEmail, getUserAcctDetails }
