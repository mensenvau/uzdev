# Core App Boilerplate

Production-ready boilerplate with advanced authentication, role-based access control, and a dynamic form system.

## Features

- Complete authentication (username/password, Google OAuth, email verification)
- Role-based access control with policies
- Group system for contextual access
- Dynamic form system with scoring and table-backed options
- Next.js 14 frontend with shadcn/ui
- Docker Compose for easy deployment
- Prisma ORM on MySQL

## Tech Stack

**Backend:** Node.js (Express), MySQL 8.0, JWT, bcrypt

**Frontend:** Next.js 14 (App Router), shadcn/ui, Tailwind CSS, TypeScript

**DevOps:** Docker, Docker Compose, Prisma Migrate

## Project Structure

```
backend/
  src/
    routes/          # Feature modules (auth, user, role, policy, group, form)
    middlewares/     # Auth & policy middlewares
    utils/           # Utilities (db, jwt, password, response, async)
    app.js           # Express app
    server.js        # Server startup
  prisma/            # Prisma config, base schema, models, migrations, seed
  Dockerfile
  package.json

frontend/
  app/               # Next.js App Router
  components/        # React components (UI + custom)
  lib/               # API client & utilities
  Dockerfile
  package.json

docker-compose.yml
.env.example
```

## Quick Start

### Option 1: Docker Compose (recommended)

```bash
cp .env.example .env
docker-compose up -d
# view logs
docker-compose logs -f
```

Access: frontend http://localhost:3000, backend http://localhost:3001, health http://localhost:3001/health

### Option 2: Manual setup

**Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate      # generate Prisma Client from multi-file schema
npm run prisma:migrate:dev   # apply migrations in dev
# for production-like flow: npm run prisma:migrate
npm run prisma:seed          # seed roles/policies/admin user/groups (seeds composed from prisma/seeds/*)
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev            # Turbopack
# or: npm run dev:legacy for the classic webpack dev server
```

## Default Credentials

After seeding:
- Email: admin@coreapp.com
- Username: superadmin
- Password: Admin@123

## Database Schema

Tables (snake_case, namespaced under system_):
- system_users, system_roles, system_policies
- system_user_roles, system_role_policies
- system_groups, system_group_users
- system_forms, system_form_access
- system_form_fields, system_form_field_options, system_form_field_table_sources
- system_form_responses, system_form_response_values

## Naming Conventions

- Functions: camelCase
- Columns: snake_case
- Files: kebab-case

## Environment Variables

See `.env.example` for full list.
- DATABASE_URL (built from DB_* defaults) or DB_USER / DB_PASSWORD / DB_NAME / DB_HOST / DB_PORT
- APP_HOST / APP_PORT
- JWT_ACCESS_SECRET / JWT_REFRESH_SECRET / JWT_PASSWORD_RESET_SECRET / JWT_FORM_ACCESS_SECRET
- FRONTEND_URL, GOOGLE_CLIENT_ID/SECRET
- EMAIL_* variables for SMTP

Env loading is centralized (`src/utils/env.utils.js` + `prisma.config.js`), so Prisma CLI and the app pick up root or backend `.env` without extra flags.

## Form System

- Field types: text, number, select, checkbox, radio, textarea, table_select, score
- Table select pulls options from any DB table
- Scoring system and question/check modes
- Access control via role, group, or public link
- Full submission history per form

## Security

- JWT authentication
- Bcrypt password hashing (10 rounds)
- Helmet headers and CORS configuration
