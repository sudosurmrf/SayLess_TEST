const prisma = require('./client.cjs');
const bcrypt = require('bcrypt');

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

const getUser = async(id) => {
try {  
  const foundUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: id
    },
    select: {
      id: true,
      username: true,
      wins: true,
      losses: true,
      avatarId: true,
      score: true
    }
  })
  return foundUser;
} catch (error) {
  return error.message;
}
}

module.exports = { createUser, getUser }