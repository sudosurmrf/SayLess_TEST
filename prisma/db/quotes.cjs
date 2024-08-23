const prisma = require('./client.cjs');

const createCustomQuote = async(text, userId) => {
  try {
    
    lowerCaseText = text.toLowerCase();

    const noPunctuationText = (str) => {
      return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~1234567890]/g, '');
    }

    const sanitizedText = noPunctuationText(lowerCaseText);

    await prisma.customQuote.create({
      data: {
        text: sanitizedText,
        userId: userId
      }
    })
  } catch (error) {
    return error;
  }
}

module.exports = { createCustomQuote }