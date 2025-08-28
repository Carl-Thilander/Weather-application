import { db } from "../db";
import { seedDefaultCities } from "./todo";

async function main() {
  await seedDefaultCities();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
