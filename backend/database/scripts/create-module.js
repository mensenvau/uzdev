/**
 * Module Creator Script
 *
 * Creates a new module with SQL migration and seed templates.
 * Follows the naming convention: <prefix>_* for all tables.
 *
 * Usage:
 *   npm run db:module:create
 *
 * Interactive prompts will ask for:
 * - Module name (e.g., "dss", "hr", "inventory")
 * - Module description
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function getMigrationTemplate(moduleName, description) {
  const prefix = moduleName.toLowerCase();
  const moduleTitle = moduleName.toUpperCase();

  return `-- ============================================================================
-- ${moduleTitle} MODULE INITIALIZATION
-- ============================================================================
-- ${description}
--
-- Prefix: ${prefix}_
-- All tables in this module use the '${prefix}_' prefix
--
-- Usage:
--   Run this migration after init_system.sql
-- ============================================================================

-- Drop existing tables if they exist (for clean reinstall)
SET FOREIGN_KEY_CHECKS = 0;

-- Add your DROP TABLE statements here
-- DROP TABLE IF EXISTS \`${prefix}_example\`;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- ${moduleTitle} TABLES
-- ============================================================================

-- Example table (replace with your actual tables)
CREATE TABLE \`${prefix}_examples\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(255) NOT NULL,
  \`description\` TEXT NULL,
  \`created_by\` INT UNSIGNED NULL COMMENT 'Reference to system_users',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_created_by\` (\`created_by\`),
  INDEX \`idx_created_at\` (\`created_at\`),
  CONSTRAINT \`fk_${prefix}_examples_creator\` FOREIGN KEY (\`created_by\`)
    REFERENCES \`system_users\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='${description} - Example table';

-- Add more tables here following the same pattern
-- Remember to:
-- 1. Use ${prefix}_ prefix for all table names
-- 2. Add proper indexes for foreign keys and frequently queried columns
-- 3. Use INT UNSIGNED for IDs
-- 4. Add created_at and updated_at timestamps
-- 5. Add appropriate foreign key constraints

-- ============================================================================
-- INITIALIZATION COMPLETE
-- ============================================================================
-- All ${prefix}_* tables have been created
-- Next step: Run seed_${moduleName}.sql to populate initial data
-- ============================================================================
`;
}

function getSeedTemplate(moduleName, description) {
  const prefix = moduleName.toLowerCase();
  const moduleTitle = moduleName.toUpperCase();

  return `-- ============================================================================
-- ${moduleTitle} MODULE SEED DATA
-- ============================================================================
-- ${description}
-- This file populates initial data for the ${moduleName} module
--
-- Usage:
--   Run this after init_${moduleName}.sql
-- ============================================================================

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Example seed data (replace with your actual data)
INSERT INTO \`${prefix}_examples\` (\`name\`, \`description\`) VALUES
('Example 1', 'First example entry'),
('Example 2', 'Second example entry'),
('Example 3', 'Third example entry')
ON DUPLICATE KEY UPDATE \`description\` = VALUES(\`description\`);

-- Add more seed data here
-- Remember to use ON DUPLICATE KEY UPDATE for idempotent seeds

-- ============================================================================
-- SEED COMPLETE
-- ============================================================================
-- ${moduleTitle} module has been seeded with initial data
-- You can now start using the ${moduleName} module
-- ============================================================================
`;
}

async function createModule() {
  console.log('\n📦 Module Creator\n');
  console.log('This will create SQL migration and seed files for a new module.\n');

  // Get module name
  const moduleName = await question('Module name (e.g., dss, hr, inventory): ');

  if (!moduleName || !/^[a-z_]+$/.test(moduleName)) {
    console.log('\n❌ Invalid module name. Use lowercase letters and underscores only.');
    rl.close();
    return;
  }

  // Get description
  const description = await question('Module description: ');

  if (!description) {
    console.log('\n❌ Description is required.');
    rl.close();
    return;
  }

  rl.close();

  try {
    // Create migration file
    const migrationPath = path.join(
      __dirname,
      '../migrations',
      `init_${moduleName}.sql`
    );

    await fs.writeFile(migrationPath, getMigrationTemplate(moduleName, description));
    console.log(`\n✅ Created: ${migrationPath}`);

    // Create seed file
    const seedPath = path.join(
      __dirname,
      '../seeds',
      `seed_${moduleName}.sql`
    );

    await fs.writeFile(seedPath, getSeedTemplate(moduleName, description));
    console.log(`✅ Created: ${seedPath}`);

    console.log('\n🎉 Module files created successfully!\n');
    console.log('Next steps:');
    console.log(`1. Edit ${migrationPath}`);
    console.log('   - Replace example table with your actual tables');
    console.log(`   - Use ${moduleName}_ prefix for all table names`);
    console.log(`2. Edit ${seedPath}`);
    console.log('   - Add your initial data');
    console.log('3. Run migrations: npm run db:init');
    console.log('4. Run seeds: npm run db:seed\n');

  } catch (error) {
    console.error('\n❌ Error creating module:', error.message);
    process.exit(1);
  }
}

// Run module creator
createModule();
