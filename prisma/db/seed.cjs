const prisma = require('./client.cjs');
const { createUser } = require('./users.cjs');

const syncAndSeed = async() => {
  try {

    await createUser("alice123", "alicePass1", "alice123@example.com");
    await createUser("bobSmith", "bobPass2", "bobsmith@example.com");
    await createUser("charlie_b", "charliePass3", "charlie_b@example.com");
    await createUser("dana89", "danaPass4", "dana89@example.com");
    await createUser("edwardX", "edwardPass5", "edwardX@example.com");
    await createUser("fionaGreen", "fionaPass6", "fionagreen@example.com");
    await createUser("george_w", "georgePass7", "george_w@example.com");
    await createUser("hannahR", "hannahPass8", "hannahR@example.com");
    await createUser("ian_doe", "ianPass9", "ian_doe@example.com");
    await createUser("juliaM", "juliaPass10", "juliaM@example.com");
    await createUser("karl_m", "karlPass11", "karl_m@example.com");
    await createUser("laura_b", "lauraPass12", "laura_b@example.com");
    await createUser("mike_84", "mikePass13", "mike_84@example.com");
    await createUser("ninaZ", "ninaPass14", "ninaZ@example.com");
    await createUser("oliverKing", "oliverPass15", "oliverKing@example.com");
    await createUser("peterQ", "peterPass16", "peterQ@example.com");
    await createUser("quinnX", "quinnPass17", "quinnX@example.com");
    await createUser("rachel_s", "rachelPass18", "rachel_s@example.com");
    await createUser("steve_22", "stevePass19", "steve_22@example.com");
    await createUser("tinaW", "tinaPass20", "tinaW@example.com");

    await prisma.$disconnect();

  } catch (error) {
    console.log(error);
  }
}

syncAndSeed();