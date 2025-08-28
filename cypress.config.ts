import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import { seedDefaultCities } from "./prisma/seed/city";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async reseed() {
          await db.city.deleteMany();
          await seedDefaultCities();

          return null;
        },
      });
    },
  },
});
