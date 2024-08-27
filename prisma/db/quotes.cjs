const prisma = require('./client.cjs');

const createCustomQuote = async(text, userId) => {
  try {
    await prisma.customQuote.create({
      data: {
        text: text,
        userId: userId
      }
    })
    return { success: true, text: text };
  } catch (error) {
    return error.message;
  }
}

const getCustomQuotes = async(id) => {
  try {
    const customQuotes = await prisma.customQuote.findMany({
      where: {
        userId: id
      },
      select: {
        text: true
      }
    })
    return customQuotes;
  } catch (error) {
    return error.message;
  }
}

module.exports = { createCustomQuote, getCustomQuotes }