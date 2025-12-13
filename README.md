# 🚀 Core App Boilerplate

Professional, production-ready application boilerplate with advanced authentication, role-based access control, and dynamic form system.

## 🎯 Features

### ✅ Complete Authentication System
- Username/Password authentication
- Google OAuth support
- Email verification
- JWT access & refresh tokens
- Password reset functionality

### 🔐 Advanced Authorization
- **Role-Based Access Control (RBAC)**
- **Policy System** - Granular permissions
- **Group System** - Independent from roles for contextual access
- Middleware-based protection

### 📋 Advanced Form System
- Dynamic form builder
- Multiple field types: text, number, select, checkbox, radio, textarea
- **Table Select** - Pull options from any database table
- **Scoring System** - Automatic score calculation
- **Question/Check Mode** - For surveys vs. review workflows
- **Flexible Access Control**:
  - Role-based access
  - Group-based access
  - Public link generation (with expiration)

### 🏗️ Architecture
- **Backend**: Node.js + Express.js
- **Database**: MySQL (pure SQL, no ORM)
- **Frontend**: Next.js 14 (App Router) + shadcn/ui + Tailwind CSS
- **Process Management**: PM2

## 📂 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration (env, database)
│   │   ├── database/        # SQL schemas and seeds
│   │   ├── routes/          # Feature modules
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── role/
│   │   │   ├── policy/
│   │   │   ├── group/
│   │   │   └── form/
│   │   ├── middlewares/     # Auth & policy middlewares
│   │   ├── utils/           # JWT, password, response helpers
│   │   └── constants/       # Roles & policies
│   ├── package.json
│   └── ecosystem.config.cjs
│
└── frontend/
    ├── app/                 # Next.js App Router
    ├── components/          # React components
    ├── services/            # API services
    └── lib/                 # Utilities
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MySQL >= 8.0
- npm or yarn

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (when ready)
cd frontend
npm install
```

### 2. Setup Database

```bash
# Create .env file in backend/
cp backend/.env.example backend/.env

# Edit .env with your database credentials
# Then initialize database
cd backend
npm run db:reset
```

Default super admin credentials:
- **Email**: admin@coreapp.com
- **Username**: superadmin
- **Password**: Admin@123

### 3. Start Development Server

```bash
# Backend
cd backend
npm run dev

# Or with PM2
npm run pm2:dev
```

Backend will run on http://localhost:3001

## 📖 Database Schema

### Core Tables

#### Users & Auth
- `users` - User accounts
- `email_verification_tokens` - Email verification
- `password_reset_tokens` - Password reset

#### Authorization
- `roles` - User roles
- `policies` - Permissions
- `role_policies` - Role-policy assignments
- `user_roles` - User-role assignments

#### Groups
- `groups` - User groups
- `group_users` - Group members

#### Forms
- `forms` - Form definitions
- `form_fields` - Form fields with types
- `field_options` - Options for select/radio/checkbox
- `field_table_sources` - Table select configurations
- `form_access` - Universal access control
- `form_responses` - Form submissions
- `form_response_values` - Individual answers

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/google
POST   /api/auth/verify-email
POST   /api/auth/refresh-token
POST   /api/auth/resend-verification
GET    /api/auth/me
```

### Users
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Roles
```
GET    /api/roles
GET    /api/roles/:id
POST   /api/roles
PUT    /api/roles/:id
DELETE /api/roles/:id
POST   /api/roles/assign
POST   /api/roles/remove
```

### Policies
```
GET    /api/policies
GET    /api/policies/:id
POST   /api/policies
PUT    /api/policies/:id
DELETE /api/policies/:id
POST   /api/policies/assign
POST   /api/policies/remove
```

### Groups
```
GET    /api/groups
GET    /api/groups/:id
POST   /api/groups
PUT    /api/groups/:id
DELETE /api/groups/:id
POST   /api/groups/add-user
POST   /api/groups/remove-user
```

### Forms
```
GET    /api/forms
GET    /api/forms/:id
POST   /api/forms
PUT    /api/forms/:id
DELETE /api/forms/:id
POST   /api/forms/:id/fields
POST   /api/forms/:id/access
POST   /api/forms/:id/generate-link
POST   /api/forms/:id/submit
GET    /api/forms/:id/responses
```

## 🛠️ PM2 Commands

```bash
# Start with PM2
npm run pm2:dev          # Development
npm run pm2:prod         # Production

# Manage
npm run pm2:stop         # Stop
npm run pm2:restart      # Restart
npm run pm2:delete       # Delete
npm run pm2:logs         # View logs
```

## 📝 Coding Standards

### Naming Conventions
- **Functions**: `camelCase` (e.g., `authSignIn`, `userCreate`)
- **Variables**: `camelCase`
- **Database**: `snake_case` (e.g., `user_id`, `created_at`)
- **Files**: `kebab-case` or `dot.notation` (e.g., `auth.service.js`)

### Standard Table Columns
Every table includes:
```sql
id BIGINT PRIMARY KEY AUTO_INCREMENT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

## 🎯 Use Cases

This boilerplate is perfect for:

- ✅ SaaS applications
- ✅ Survey/Form platforms
- ✅ Exam/Quiz systems
- ✅ HR management systems
- ✅ Audit/Inspection tools
- ✅ Any app requiring granular permissions

## 🔒 Security Features

- JWT-based authentication
- Bcrypt password hashing
- Helmet.js security headers
- CORS configuration
- SQL injection prevention (parameterized queries)
- Policy-based authorization
- Token expiration handling

## 📚 Next Steps

1. **Customize policies** in `backend/src/database/seed.sql`
2. **Add email service** for verification emails
3. **Implement Google OAuth** with credentials
4. **Build frontend** with Next.js
5. **Add more field types** to forms as needed
6. **Deploy** to your preferred platform

## 🤝 Contributing

This is a boilerplate project. Fork it and make it your own!

## 📄 License

MIT

---

**Built with ❤️ for developers who want to focus on business logic, not boilerplate.**
