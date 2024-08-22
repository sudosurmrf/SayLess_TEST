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
  } catch (error) {
    return error;
  }
}

module.exports = { createUser }