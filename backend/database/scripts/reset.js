const readline = require("readline");
const { exec } = require("child_process");
const util = require("util");
const mysql = require("mysql2/promise");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });

const execPromise = util.promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function dropAllTables() {
  console.log("🗑️  Dropping all tables...\n");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "core_app",
  });

  try {
    // Disable foreign key checks
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");

    // Get all tables
    const [tables] = await connection.query("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?", [process.env.DB_NAME || "core_app"]);

    // Drop each table
    for (const table of tables) {
      const tableName = table.TABLE_NAME;
      console.log(`  Dropping table: ${tableName}`);
      await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
    }

    // Re-enable foreign key checks
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("\n✅ All tables dropped\n");
  } catch (error) {
    console.error("❌ Error dropping tables:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

async function resetDatabase() {
  console.log("\n⚠️  DATABASE RESET WARNING ⚠️");
  console.log("This will DELETE ALL DATA and recreate the database!");
  console.log(`Database: ${process.env.DB_NAME || "core_app"}\n`);

  const answer = await question('Are you sure? Type "yes" to continue: ');

  if (answer.toLowerCase() !== "yes") {
    console.log("\n❌ Reset cancelled");
    rl.close();
    return;
  }

  rl.close();

  try {
    // Step 1: Drop all tables
    await dropAllTables();

    // Step 2: Run migrations
    console.log("📦 Running migrations...\n");
    const { stdout: initOut } = await execPromise("node database/scripts/init.js");
    console.log(initOut);

    // Step 3: Run seeds
    console.log("\n🌱 Running seeds...\n");
    const { stdout: seedOut } = await execPromise("node database/scripts/seed.js");
    console.log(seedOut);

    console.log("\n🎉 Database reset complete!\n");
  } catch (error) {
    console.error("\n❌ Reset failed:", error.message);
    process.exit(1);
  }
}

// Run reset
resetDatabase();
