# 🚀 Core App Boilerplate

Production-ready application boilerplate with advanced authentication, role-based access control, and dynamic form system.

## ✨ Features

- ✅ Complete authentication (username/password, Google OAuth, email verification)
- ✅ Role-based access control with policies
- ✅ Group system for contextual access
- ✅ Advanced dynamic form system with scoring
- ✅ Next.js 14 frontend with shadcn/ui
- ✅ Docker Compose for easy deployment
- ✅ Pure SQL (no ORM)
- ✅ TypeScript support

## 🏗️ Tech Stack

**Backend:**

- Node.js + Express
- MySQL 8.0
- JWT authentication
- Bcrypt password hashing

**Frontend:**

- Next.js 14 (App Router)
- shadcn/ui components
- Tailwind CSS
- TypeScript

**DevOps:**

- Docker & Docker Compose
- MySQL container

## 📂 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── routes/          # Feature modules (auth, user, role, policy, group, form)
│   │   ├── middlewares/     # Auth & policy middlewares
│   │   ├── utils/           # Utilities (db, jwt, password, response, async)
│   │   ├── database/        # SQL schemas and seeds
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server startup
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components (UI + custom)
│   ├── lib/                 # API client & utilities
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── .env.example
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

Access:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Option 2: Manual Setup

**1. Database Setup**

```bash
# Start MySQL (via Docker or local installation)
mysql -u root -p < backend/src/database/init.sql
mysql -u root -p < backend/src/database/seed.sql
```

**2. Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**3. Frontend Setup**

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## 🔐 Default Credentials

After running database seeds:

- **Email:** admin@coreapp.com
- **Username:** superadmin
- **Password:** Admin@123

## 🎯 Database Schema

**Core Tables:**

- `users` - User accounts
- `roles` - User roles (super_admin, admin, user, guest)
- `policies` - Permissions (40+ policies)
- `user_roles` - User-role assignments
- `role_policies` - Role-policy assignments
- `groups` - User groups
- `group_users` - Group members
- `forms` - Dynamic forms
- `form_fields` - Form field definitions
- `field_options` - Options for select/radio/checkbox
- `form_responses` - Form submissions
- `form_response_values` - Individual answer values

All tables include: `id`, `created_at`, `updated_at`

## 📝 Naming Conventions

- **Functions:** `camelCase` (e.g., `authSignIn`, `userCreate`)
- **Database:** `snake_case` (e.g., `user_id`, `created_at`)
- **Files:** `kebab-case` (e.g., `auth.service.js`)
- **No comments** - Clean, self-documenting code

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Rebuild and start
docker-compose up -d --build

# Stop and remove volumes
docker-compose down -v
```

## 🔧 Environment Variables

See `.env.example` for all available variables.

**Required:**

- `DB_PASSWORD` - MySQL root password
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret

**Optional:**

- `PORT` - Backend port (default: 3001)
- `FRONTEND_PORT` - Frontend port (default: 3000)
- `DB_HOST` - Database host (default: localhost)
- `DB_NAME` - Database name (default: core_app)

## 🎨 Form System

The advanced form system supports:

- **Field Types:** text, number, select, checkbox, radio, textarea
- **Table Select:** Pull options from any database table
- **Scoring System:** Automatic score calculation
- **Question/Check Mode:** Different workflows
- **Access Control:** Role, group, or public link based
- **Response Tracking:** Full submission history

## 🔒 Security Features

- JWT-based authentication
- Bcrypt password hashing (10 rounds)
- Helmet.js security headers
- CORS configuration
- SQL injection prevention (parameterized queries)
- Policy-based authorization
- Token expiration handling

## 🚀 Deployment

**Production checklist:**

1. Update environment variables
2. Change JWT secrets
3. Set strong database password
4. Configure CORS for production domain
5. Enable HTTPS
6. Set `NODE_ENV=production`

## 📚 Use Cases

Perfect for:

- SaaS applications
- Survey/Form platforms
- Exam/Quiz systems
- HR management systems
- Audit/Inspection tools
- Any app requiring granular permissions

## 🤝 Contributing

Fork and customize for your needs!

## 📄 License

MIT

---

**Built for developers who want to focus on business logic, not boilerplate.**
