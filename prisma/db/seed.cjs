const prisma = require('./client.cjs');
const { createUser } = require('./users.cjs');
const { createWinBadge, createPlayBadge } = require('./badges.cjs');
const { createCustomQuote } = require('./quotes.cjs');

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

    await createWinBadge("1st win!", 1);
    await createWinBadge("5th win!", 5);
    await createWinBadge("10th win!", 10);
    await createWinBadge("25th win!", 25);
    await createWinBadge("50th win!", 50);
    await createWinBadge("100th win!", 100);
    await createWinBadge("500th win!", 500);
    await createWinBadge("1,000th win!", 1000);
    
    await createPlayBadge("1st game!", 1);
    await createPlayBadge("5th game!", 5);
    await createPlayBadge("10th game!", 10);
    await createPlayBadge("25th game!", 25);
    await createPlayBadge("50th game!", 50);
    await createPlayBadge("100th game!", 100);
    await createPlayBadge("500th game!", 500);
    await createPlayBadge("1,000th game!", 1000);

    await createCustomQuote(`actions speak louder than words`, 9);
    await createCustomQuote(`i like candy`, 6);

    await prisma.$disconnect();

  } catch (error) {
    console.log(error);
  }
}

syncAndSeed();