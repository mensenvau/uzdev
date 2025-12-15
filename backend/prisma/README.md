# Prisma Modular Setup

This directory contains the modular Prisma setup for the application. Each module (system, dss, etc.) has its own schema and seed files.

## 📁 Directory Structure

```
prisma/
├── schema.prisma          # Main schema file (references all modules)
├── schemas/              # Module schemas
│   ├── system.prisma    # System module (system_* tables)
│   ├── dss.prisma       # DSS module (dss_* tables)
│   └── ...              # Add more modules here
├── seeds/               # Seed files
│   ├── index.js        # Main seed orchestrator
│   ├── system.seed.js  # System module seed
│   ├── dss.seed.js     # DSS module seed
│   └── ...             # Add more seed files here
└── migrations/         # Database migrations
```

## 🚀 Quick Start

### Generate Prisma Client
```bash
npm run prisma:generate
```

### Run Migrations
```bash
# Development (with prompts)
npm run prisma:migrate:dev

# Production (auto-deploy)
npm run prisma:migrate
```

### Seed Database
```bash
npm run prisma:seed
```

### Open Prisma Studio
```bash
npm run prisma:studio
```

## ➕ Adding a New Module

### 1. Create Schema File

Create `schemas/hr.prisma` for HR module with `hr_` prefix:

```prisma
// HR Module Schema
// All tables use 'hr_' prefix

model HrEmployee {
  id         Int      @id @default(autoincrement())
  name       String
  position   String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@map("hr_employees")
}
```

### 2. Reference in Main Schema

Edit `schema.prisma` and add:

```prisma
/// HR Module - Human Resources
/// Tables: hr_*
/// <reference path="./schemas/hr.prisma" />
```

### 3. Create Seed File

Create `seeds/hr.seed.js`:

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function hrSeed() {
  console.log("🌱 Seeding HR module...");

  await prisma.hrEmployee.createMany({
    data: [
      { name: "John Doe", position: "Manager" },
      { name: "Jane Smith", position: "Developer" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ HR module seed completed.");
}
```

### 4. Register Seed

Edit `seeds/index.js` and add:

```javascript
import hrSeed from "./hr.seed.js";

// Add to seeds array:
const seeds = [
  { name: "System", fn: systemSeed },
  { name: "DSS", fn: dssSeed },
  { name: "HR", fn: hrSeed },  // Add this line
];
```

### 5. Generate & Migrate

```bash
npm run prisma:generate
npm run prisma:migrate:dev --name add_hr_module
npm run prisma:seed
```

## 📦 Using Prisma Client

### Import from Centralized Utility

**Always import from `/src/utils/db.util.js`** - never create new PrismaClient instances:

```javascript
import { prisma } from "../../utils/db.util.js";

// Query any module's tables
const users = await prisma.user.findMany();           // system_users
const employees = await prisma.hrEmployee.findMany(); // hr_employees
```

### Using Transactions

```javascript
import { prisma } from "../../utils/db.util.js";

await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { ... } });
  await tx.userRole.create({ data: { user_id: user.id, ... } });
});
```

## 🗂️ Current Modules

### System Module (`system_*`)
Core authentication and authorization:
- Users, Roles, Policies
- Groups, User-Role assignments
- Forms and form responses

**Schema:** `schemas/system.prisma`
**Seed:** `seeds/system.seed.js`

### DSS Module (`dss_*`)
Decision Support System (example/template):

**Schema:** `schemas/dss.prisma`
**Seed:** `seeds/dss.seed.js`

*Add your DSS tables in `schemas/dss.prisma` following the example pattern.*

## 🔧 Environment Variables

Configure in `.env`:

```env
# Individual DB config (converted to DATABASE_URL automatically)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=core_app

# Or use DATABASE_URL directly
DATABASE_URL=mysql://user:password@localhost:3306/core_app
```

## 📝 Best Practices

1. **Module Naming:** Use consistent prefixes (`system_`, `dss_`, `hr_`, etc.)
2. **One Module = One Schema File:** Keep module tables together
3. **Seed Order:** System module should seed first (dependencies)
4. **Import Pattern:** Always use `import { prisma } from 'utils/db.util.js'`
5. **Migrations:** Name them descriptively (`add_hr_module`, `update_user_fields`, etc.)

## 🔍 Useful Commands

```bash
# Format schema files
npx prisma format

# Validate schema
npx prisma validate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Pull database schema into Prisma
npx prisma db pull

# Push schema without migration
npx prisma db push
```

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
