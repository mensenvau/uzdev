#!/usr/bin/env node
/**
 * Prisma Seed Orchestrator
 *
 * This file coordinates seeding for all modules.
 * Each module has its own seed file in this directory.
 *
 * To add a new module seed:
 * 1. Create a new seed file (e.g., hr.seed.js)
 * 2. Import it below
 * 3. Add it to the seeds array
 */

import { prisma } from "../../src/utils/db.util.js";
import systemSeed from "./system.seed.js";
import dssSeed from "./dss.seed.js";

async function main() {
  console.log("🚀 Starting database seeding...\n");

  try {
    // Seed modules in order
    // Add new module seeds to this array
    const seeds = [
      { name: "System", fn: systemSeed },
      { name: "DSS", fn: dssSeed },
      // Add new modules here:
      // { name: "HR", fn: hrSeed },
    ];

    for (const { name, fn } of seeds) {
      console.log(`\n📦 Seeding ${name} module...`);
      await fn();
    }

    console.log("\n✅ All seeds completed successfully!");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
