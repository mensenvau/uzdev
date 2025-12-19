const fs = require("fs").promises;
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });

async function runSeeds() {
  console.log("🌱 Starting database seeding...\n");

  // Create connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "core_app",
    multipleStatements: true,
  });

  try {
    // Test connection
    await connection.ping();
    console.log("✅ Database connection successful\n");

    // Get all seed files
    const seedsDir = path.join(__dirname, "../seeds");
    const files = await fs.readdir(seedsDir);
    const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();

    if (sqlFiles.length === 0) {
      console.log("⚠️  No seed files found");
      return;
    }

    // Run each seed
    for (const file of sqlFiles) {
      const filePath = path.join(seedsDir, file);
      console.log(`📄 Running seed: ${file}`);

      const sql = await fs.readFile(filePath, "utf8");
      await connection.query(sql);

      console.log(`✅ Completed: ${file}\n`);
    }

    console.log("🎉 All seeds completed successfully!\n");
    console.log("Database is ready to use!");
    console.log("\nDefault login credentials:");
    console.log("  Email: balkibumen@gmail.com");
    console.log("  Password: Admin@123\n");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Run seeds
runSeeds();
