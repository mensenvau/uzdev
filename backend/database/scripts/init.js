const fs = require("fs").promises;
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });

async function runMigrations() {
  console.log("🚀 Starting database initialization...\n");

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

    // Get all migration files
    const migrationsDir = path.join(__dirname, "../migrations");
    const files = await fs.readdir(migrationsDir);
    const sqlFiles = files.filter((f) => f.endsWith(".sql")).sort();

    if (sqlFiles.length === 0) {
      console.log("⚠️  No migration files found");
      return;
    }

    // Run each migration
    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);
      console.log(`📄 Running migration: ${file}`);

      const sql = await fs.readFile(filePath, "utf8");
      await connection.query(sql);

      console.log(`✅ Completed: ${file}\n`);
    }

    console.log("🎉 All migrations completed successfully!\n");
    console.log('Next step: Run "npm run db:seed" to populate initial data');
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

// Run migrations
runMigrations();
