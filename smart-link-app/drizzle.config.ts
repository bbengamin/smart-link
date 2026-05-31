import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  // Set via DRIZZLE_DATABASE_URL env var in production
  // database: process.env.DRIZZLE_DATABASE_URL || "postgresql://...",
});
