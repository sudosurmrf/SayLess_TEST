const prisma = require('./client.cjs');

const createCustomQuote = async(text, userId) => {
  try {

    await prisma.customQuote.create({
      data: {
        text: text,
        userId: userId
      }
    })
  } catch (error) {
    return error;
  }
}

module.exports = { createCustomQuote }