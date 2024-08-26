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

const getCustomQuotes = async(id) => {
  try {
    const quoteRecords = await prisma.customQuote.findMany({
      where: {
        userId: id
      },
      select: {
        text: true
      }
    })
    const customQuotes = quoteRecords.map(record => record.text);
    return customQuotes;
  } catch (error) {
    return error;
  }
}

module.exports = { createCustomQuote, getCustomQuotes }