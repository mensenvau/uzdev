import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * DSS Module Seed
 * Seeds data for Decision Support System tables (dss_*)
 */
export default async function dssSeed() {
  console.log("🌱 Seeding DSS module...");

  // Example: Seed DSS tables here
  /*
  await prisma.dssExample.createMany({
    data: [
      { name: "Example 1" },
      { name: "Example 2" },
    ],
    skipDuplicates: true,
  });
  */

  console.log("✅ DSS module seed completed.");
}
