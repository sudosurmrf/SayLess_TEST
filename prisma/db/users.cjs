const prisma = require('./client.cjs');

const createUser = async(username, password, email) => {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
        email: email
      }
    })
    return { success: true, username: username };
  } catch (error) {
    return { success: false, error: error.message };
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