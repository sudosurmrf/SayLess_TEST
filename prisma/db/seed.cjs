const prisma = require('./client.cjs');
const { createUser } = require('./users.cjs');

const syncAndSeed = async() => {
  try {
    await createUser(`paul`, `pwrod`, `paul@email.com`);
    await createUser(`paul`, `pwrod`, `paul@email.com`);
    await createUser(`lena`, `pwrod`, `lena@email.com`);
    await createUser(`victor`, `pwrod`, `victor@email.com`);

    await prisma.$disconnect();

  } catch (error) {
    console.log(error);
  }
}

syncAndSeed();