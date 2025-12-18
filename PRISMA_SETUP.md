# ✅ Prisma Modular Setup - Bajarildi

## 📋 O'zgarishlar

### 1. ✅ .env Fayli
- `.env.example` dan `.env` yaratildi
- Database ulanish ma'lumotlari tayyor

### 2. ✅ NPM Paketlar Yangilandi
```json
"@prisma/client": "7.1.0"  (oxirgi versiya)
"prisma": "7.1.0"           (oxirgi versiya)
"zod": "4.1.13"             (oxirgi versiya)
```

### 3. ✅ Modular Prisma Schema Tuzilmasi

**Yangi struktura:**
```
backend/prisma/
├── schema.prisma              # Asosiy schema (barcha modullarni reference qiladi)
├── schemas/                   # Modul schemalari
│   ├── system.prisma         # System moduli (system_* jadvallar)
│   └── dss.prisma            # DSS moduli (dss_* jadvallar) - shablon
├── seeds/                     # Seed fayllar
│   ├── index.js              # Asosiy seed orkestrator
│   ├── system.seed.js        # System moduli uchun seed
│   └── dss.seed.js           # DSS moduli uchun seed - shablon
└── README.md                  # To'liq dokumentatsiya
```

**Schema fayllar:**
- `schemas/system.prisma` - Barcha `system_*` jadvallar (users, roles, policies, forms)
- `schemas/dss.prisma` - DSS moduli uchun shablon (siz o'z jadvallaringizni qo'shasiz)

**Main schema.prisma:**
- Har bir modulni reference qiladi
- Yangi modul qo'shish uchun yo'riqnoma bor

### 4. ✅ Modular Seed Tuzilmasi

**Seed fayllar:**
- `seeds/index.js` - Barcha seed fayllarni chaqiradi
- `seeds/system.seed.js` - System jadvallarni to'ldiradi (roles, policies, admin user)
- `seeds/dss.seed.js` - DSS moduli uchun shablon

**Package.json yangilandi:**
```json
"prisma": {
  "seed": "node prisma/seeds/index.js"
}
```

### 5. ✅ Prisma Client - Markazlashtirilgan

**Fayl:** `backend/src/utils/db.util.js`

**Xususiyatlar:**
- ✅ Yagona PrismaClient instance (singleton pattern)
- ✅ To'liq dokumentatsiya qo'shildi
- ✅ Transaction helper funksiya
- ✅ .env dan DATABASE_URL ni avtomatik yasash
- ✅ Barcha service'lar shu fayldan import qiladi

**Ishlatish:**
```javascript
// Oddiy query
import { prisma } from "../../utils/db.util.js";
const users = await prisma.user.findMany();

// Transaction
import { withTransaction } from "../../utils/db.util.js";
await withTransaction(async (tx) => {
  await tx.user.create({ ... });
  await tx.role.create({ ... });
});
```

## 🚀 Qanday Ishlatish

### Prisma Client Generatsiya Qilish
```bash
cd backend
npm run prisma:generate
```

### Migration Yaratish
```bash
# Development
npm run prisma:migrate:dev

# Production
npm run prisma:migrate
```

### Database Seed Qilish
```bash
npm run prisma:seed
```

### Prisma Studio Ochish
```bash
npm run prisma:studio
```

## ➕ Yangi Modul Qo'shish (Masalan: HR moduli - hr_*)

### 1. Schema yarating: `backend/prisma/schemas/hr.prisma`
```prisma
model HrEmployee {
  id         Int      @id @default(autoincrement())
  name       String
  department String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@map("hr_employees")
}
```

### 2. Main schemaga qo'shing: `backend/prisma/schema.prisma`
```prisma
/// HR Module - Human Resources
/// Tables: hr_*
/// <reference path="./schemas/hr.prisma" />
```

### 3. Seed yarating: `backend/prisma/seeds/hr.seed.js`
```javascript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function hrSeed() {
  console.log("🌱 Seeding HR module...");

  await prisma.hrEmployee.createMany({
    data: [
      { name: "John Doe", department: "IT" },
      { name: "Jane Smith", department: "HR" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ HR module seed completed.");
}
```

### 4. Seed index'ga qo'shing: `backend/prisma/seeds/index.js`
```javascript
import hrSeed from "./hr.seed.js";

const seeds = [
  { name: "System", fn: systemSeed },
  { name: "DSS", fn: dssSeed },
  { name: "HR", fn: hrSeed },  // Qo'shing
];
```

### 5. Generate va Migrate qiling
```bash
npm run prisma:generate
npm run prisma:migrate:dev --name add_hr_module
npm run prisma:seed
```

## 📂 Qayerda Nima Bor

### Database Ulanishi
- **Fayl:** `.env` (root)
- **Variables:** DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- **URL:** Avtomatik `db.util.js` da yasaladi

### Prisma Client
- **Import:** `backend/src/utils/db.util.js` dan
- **Pattern:** Hamma service'lar shu fayldan import qiladi
- **Joylashuvi:** `backend/node_modules/.prisma/client` (generate qilingandan so'ng)

### Schema Fayllar
- **Asosiy:** `backend/prisma/schema.prisma`
- **Modullar:** `backend/prisma/schemas/*.prisma`

### Seed Fayllar
- **Asosiy:** `backend/prisma/seeds/index.js`
- **Modullar:** `backend/prisma/seeds/*.seed.js`

### Dokumentatsiya
- **To'liq guide:** `backend/prisma/README.md`
- **Bu fayl:** Umumiy o'zgarishlar va quick reference

## 📊 Hozirgi Modullar

### System Module (system_*)
**Jadvallar:**
- system_users
- system_roles
- system_policies
- system_role_policies
- system_user_roles
- system_groups
- system_group_users
- system_forms
- system_form_access
- system_form_fields
- system_form_field_options
- system_form_field_table_sources
- system_form_responses
- system_form_response_values

**Schema:** `schemas/system.prisma`
**Seed:** `seeds/system.seed.js`

### DSS Module (dss_*)
**Status:** Shablon (siz to'ldirasiz)
**Schema:** `schemas/dss.prisma`
**Seed:** `seeds/dss.seed.js`

## ✅ Import Pattern - Hamma Joyda

Barcha service fayilarda Prisma client shu tarzda import qilingan:

```javascript
// backend/src/routes/*/service.js fayillarida
import { prisma } from "../../utils/db.util.js";

// Middleware'larda
import { prisma } from "../utils/db.util.js";
```

**Tekshirilgan fayllar:**
- ✅ auth.service.js
- ✅ user.service.js
- ✅ role.service.js
- ✅ policy.service.js
- ✅ group.service.js
- ✅ form.service.js
- ✅ auth.middleware.js
- ✅ policy.middleware.js

Hammasi `db.util.js` dan import qiladi! ✅

## 🎯 Keyingi Qadamlar

1. **Prisma Client Generate qiling:**
   ```bash
   cd backend
   npm run prisma:generate
   ```

2. **Database Migrate qiling:**
   ```bash
   npm run prisma:migrate:dev
   ```

3. **Seed qiling:**
   ```bash
   npm run prisma:seed
   ```

4. **DSS moduli uchun jadvallar qo'shing:**
   - `schemas/dss.prisma` da o'z modellaringizni yarating
   - `seeds/dss.seed.js` da seed data qo'shing

5. **Boshqa modullar qo'shing (kerak bo'lsa):**
   - Yuqoridagi "Yangi Modul Qo'shish" bo'limiga qarang

## 📚 Qo'shimcha Ma'lumot

To'liq dokumentatsiya: `backend/prisma/README.md`

Muvaffaqiyatli! Barcha tuzilma tayyor! 🎉
