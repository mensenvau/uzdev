# Core App Boilerplate (MySQL template)

Production-ready template with auth, RBAC, groups, and a dynamic form system on plain MySQL (no Prisma). Each module owns its own `init_<module>.sql` and `seed_<module>.sql` so you can drop new modules in with a table prefix.

## Features

- Authentication (email/password + Google OAuth), JWT refresh, password reset emails
- Role-based access control with policy mapping and group support
- Dynamic forms with scoring, table-backed options, and check/question modes
- SQL-first migrations/seeds per module (`system_*` base + module prefixes)
- Docker Compose for local infra; scripts for init/seed/reset

## Tech Stack

**Backend:** Node.js (Express), MySQL 8.0, JWT, bcrypt  
**Frontend:** Next.js 14 (App Router), shadcn/ui, Tailwind CSS, TypeScript  
**DevOps:** Docker, Docker Compose

## Project Structure

```
backend/
  src/
    routes/          # auth, user, role, policy, group, form
    middlewares/
    utils/
    app.js
    server.js
  database/
    migrations/      # init_system.sql (one-time)
    seeds/           # seed_system.sql (one-time)
    scripts/         # init.js, seed.js, reset.js, create-module.js
  Dockerfile
  package.json

frontend/
  app/
  components/
  lib/
  Dockerfile
  package.json

docker-compose.yml
.env.example
```

## Quick Start

### Option 1: Docker Compose

```bash
cp .env.example .env
docker-compose up -d mysql
# one-time DB bootstrap
docker-compose run --rm backend npm run db:init
docker-compose run --rm backend npm run db:seed
docker-compose up -d
docker-compose logs -f backend
```

Access: frontend http://localhost:3000, backend http://localhost:3001, health http://localhost:3001/health

### Option 2: Manual setup

**Backend**

```bash
cd backend
npm install
cp ../.env.example ../.env   # or set DB_* manually
npm run db:init              # runs database/migrations/*.sql (system first)
npm run db:seed              # runs database/seeds/*.sql
npm run dev                  # nodemon server
```

**Frontend**

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## Default Credentials

After `npm run db:seed`:
- Email: `balkibumen@gmail.com`
- Username: `admin`
- Password: `Admin@123` (see seed hash)

## Database Layout

Base tables (all `system_*`):
- system_users, system_roles, system_policies
- system_user_roles, system_role_policies
- system_groups, system_group_users
- system_forms, system_form_access
- system_form_fields, system_form_field_options, system_form_field_table_sources
- system_form_responses, system_form_response_values

Module pattern:
- Create `database/migrations/init_<module>.sql` and `database/seeds/seed_<module>.sql`
- Use your own table prefix (e.g., `hr_`, `crm_`)
- `npm run db:module:create` generates starter files for you

## Naming Conventions

- Functions: camelCase
- Variables: snake_case
- Columns: snake_case
- Files: kebab-case

## Useful Commands

- `npm run db:bootstrap` — init + seed combo (drops/recreates if init files drop tables)
- `npm run db:init` — run every `database/migrations/*.sql` (alphabetical, starts with `init_system.sql`)
- `npm run db:seed` — run every `database/seeds/*.sql`
- `npm run db:reset` — drop all tables, then init + seed (dev only)
- `npm run db:module:create` — scaffold `init_<module>.sql` + `seed_<module>.sql`

## Form System Notes

- Field types: text, number, select, checkbox, radio, textarea, column, score
- `column` can reference a database column for values
- Modes: `question` (standard) and `check` (audit)
- Access: role/group/link tokens; full response history stored with scores
