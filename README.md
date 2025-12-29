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

## Google Forms Integration

The application now supports integration with Google Forms API to fetch forms and responses from Google Drive.

### Setup Google Forms API

**Option 1: Service Account JSON File (Recommended)**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Forms API and Google Drive API
4. Create a Service Account and download the JSON key
5. Share your Google Forms with the service account email (important!)
6. Save the JSON file and set the path in `.env`:
   ```
   GOOGLE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json
   ```

**Option 2: Service Account JSON as Environment Variable**

1. Follow steps 1-5 from Option 1
2. Copy the entire JSON content and set it in `.env`:
   ```
   GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key":"...",...}'
   ```

**Option 3: OAuth2 Tokens (For user-specific access)**

1. Create OAuth2 credentials in Google Cloud Console
2. Get access token and refresh token
3. Set in `.env`:
   ```
   GOOGLE_FORMS_OAUTH_ACCESS_TOKEN=your_access_token
   GOOGLE_FORMS_OAUTH_REFRESH_TOKEN=your_refresh_token
   ```

**Security Note:** Credentials are now stored securely on the backend via environment variables. The frontend never sends or handles Google API credentials.

### Google Forms API Endpoints

All endpoints use credentials from backend environment variables. No credentials needed in request body.

**List all Google Forms:**
```bash
POST /api/forms/list
Authorization: Bearer YOUR_JWT_TOKEN
{
  "page_size": 10,
  "page_token": null
}
```

**Get form structure:**
```bash
POST /api/forms/:form_id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Get form responses:**
```bash
POST /api/forms/:form_id/responses
Authorization: Bearer YOUR_JWT_TOKEN
{
  "page_size": 100
}
```

**Get responses with column visibility and calculated columns:**
```bash
POST /api/forms/:form_id/responses/columns
Authorization: Bearer YOUR_JWT_TOKEN
{
  "visible_columns": ["question_id_1", "question_id_2"],
  "calculate_columns": [
    {
      "name": "total_score",
      "type": "sum",
      "fields": ["question_id_1", "question_id_2"]
    },
    {
      "name": "full_name",
      "type": "concat",
      "fields": ["first_name", "last_name"],
      "separator": " "
    }
  ]
}
```

**Public endpoints (no authentication required):**
```bash
# Get public form structure
POST /api/forms/public/:form_id

# Submit form response
POST /api/forms/public/:form_id/submit
{
  "answers": [
    { "field_id": "question_1", "value": "Answer 1" },
    { "field_id": "question_2", "value": "Answer 2" }
  ]
}
```

**Calculated Column Types:**
- `sum` - Sum numeric values from specified fields
- `average` - Calculate average of numeric fields
- `concat` - Concatenate text values with separator
- `count` - Count non-empty answers

## Docker Deployment

### Production Deployment

**Build and run with Docker Compose:**

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Environment-specific deployments:**

```bash
# Development
docker-compose up -d

# Production (with custom compose file)
docker-compose -f docker-compose.prod.yml up -d
```

### Individual Container Management

**Backend:**
```bash
cd backend
docker build -t core-app-backend .
docker run -p 3001:3001 --env-file ../.env core-app-backend
```

**Frontend:**
```bash
cd frontend
docker build -t core-app-frontend .
docker run -p 3000:3000 core-app-frontend
```

**MySQL:**
```bash
docker run -d \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=core_app \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0
```

### Docker Compose Services

The `docker-compose.yml` includes:
- **mysql** - MySQL 8.0 database
- **backend** - Node.js Express API server
- **frontend** - Next.js application

**Volumes:**
- `mysql_data` - Persistent database storage

**Networks:**
- `app-network` - Internal communication between services

## Module Development

### Creating a New Module

Use the built-in module generator:

```bash
cd backend
npm run db:module:create

# Follow prompts:
# - Module name: e.g., "inventory"
# - Table prefix: e.g., "inv_"
```

This creates:
- `database/migrations/init_<module>.sql`
- `database/seeds/seed_<module>.sql`

### Module Structure

**1. Create Module Tables (migration file):**

```sql
-- database/migrations/init_inventory.sql
DROP TABLE IF EXISTS inv_products;
CREATE TABLE inv_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**2. Add Sample Data (seed file):**

```sql
-- database/seeds/seed_inventory.sql
INSERT INTO inv_products (name, sku, price) VALUES
  ('Widget A', 'WDG-001', 19.99),
  ('Widget B', 'WDG-002', 29.99);
```

**3. Create API Routes:**

```
backend/src/routes/inventory/
  ├── inventory.router.js
  ├── inventory.controller.js
  ├── inventory.service.js
  └── inventory.schema.js
```

**4. Register Routes in `app.js`:**

```javascript
const inventoryRouter = require('./routes/inventory/inventory.router');
app.use("/api/inventory", inventoryRouter);
```

### Running Module Migrations

```bash
# Run all migrations (including your new module)
npm run db:init

# Run seeds
npm run db:seed

# Or reset everything
npm run db:reset
```

## Development & Testing

### Local Development Setup

**Backend development with hot reload:**
```bash
cd backend
npm install
npm run dev  # Uses nodemon for auto-restart
```

**Frontend development:**
```bash
cd frontend
npm install
npm run dev  # Next.js dev server with hot reload
```

**Database development:**
```bash
# Initialize database
npm run db:init

# Seed with test data
npm run db:seed

# Reset database (drops all tables)
npm run db:reset

# Bootstrap (init + seed)
npm run db:bootstrap
```

### Testing

**Manual API Testing:**

```bash
# Health check
curl http://localhost:3001/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"balkibumen@gmail.com","password":"Admin@123"}'

# List forms (with auth token)
curl http://localhost:3001/api/forms \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Testing Google Forms Integration:**

```bash
# First, ensure credentials are set in .env file
# GOOGLE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json
# or GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'

# Test list forms (requires authentication)
curl -X POST http://localhost:3001/api/forms/list \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"page_size": 10}'

# Test public form access (no authentication required)
curl -X POST http://localhost:3001/api/forms/public/YOUR_FORM_ID \
  -H "Content-Type: application/json"
```

### Debugging

**Backend logs:**
```bash
# With Docker
docker-compose logs -f backend

# Local
npm run dev  # Logs appear in terminal
```

**Database inspection:**
```bash
# Connect to MySQL in Docker
docker-compose exec mysql mysql -u root -p core_app

# Show tables
SHOW TABLES;

# Check users
SELECT * FROM system_users;
```

**Common Issues:**

1. **Port already in use:**
   ```bash
   # Find process using port 3001
   lsof -i :3001
   kill -9 <PID>
   ```

2. **Database connection failed:**
   - Check MySQL is running: `docker-compose ps`
   - Verify credentials in `.env`
   - Ensure database exists: `npm run db:init`

3. **Google Forms API errors:**
   - Verify API is enabled in Google Cloud Console
   - Check credentials are valid
   - Ensure forms are shared with service account

### Code Quality

**Naming conventions:**
- Functions: `camelCase`
- Variables: `snake_case`
- Database columns: `snake_case`
- Files: `kebab-case`
- Constants: `UPPER_SNAKE_CASE`

**Code structure:**
- Keep business logic in service files
- Controllers handle HTTP requests/responses only
- Use Zod schemas for validation
- Always use parameterized queries (SQL injection prevention)

## Frontend Architecture

### Forms Integration

The frontend provides a complete UI for managing and filling Google Forms:

**Pages:**
- `/forms` - List all Google Forms from Drive
- `/forms/[id]` - View form details, preview, and settings
- `/forms/public/[id]` - Public form filling (no authentication)

**Components:**
- `FormViewer` - Reusable component to display and fill forms
- `FormsTable` - Table view with search and actions

**Features:**
- View all Google Forms from your Drive
- Preview form structure with all field types
- Copy public links for sharing
- Open forms directly in Google Forms
- Submit responses without authentication
- Support for all Google Forms field types:
  - Text and textarea
  - Radio buttons, checkboxes, select
  - Date and time pickers
  - Scale/rating questions
- Required field validation
- Real-time form filling experience

**Reusable Component:**

```tsx
import { FormViewer } from "@/components/forms/form-viewer";

<FormViewer
  form={formStructure}
  loading={false}
  error={null}
  showSubmit={true}
  onSubmit={(answers) => console.log(answers)}
/>
```
