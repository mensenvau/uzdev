# Core App Frontend

A modern Next.js 14 frontend application with shadcn/ui components, authentication, and form management.

## Features

- Next.js 14 App Router
- TypeScript support
- shadcn/ui component library
- Tailwind CSS for styling
- Authentication flow (login/register)
- Protected routes
- Form management
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on port 3001

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.local.example .env.local
```

3. Update the API URL in `.env.local` if needed:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
/home/user/uzdev/frontend/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/            # Dashboard page
│   ├── forms/                # Forms pages
│   │   └── [id]/             # Dynamic form detail page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── auth/                 # Auth components
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   └── forms/                # Form components
│       ├── form-list.tsx
│       └── form-detail.tsx
├── lib/                      # Utilities and services
│   ├── api.ts                # Axios instance with interceptors
│   ├── auth.ts               # Auth helpers
│   └── utils.ts              # Utility functions
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Available Routes

- `/` - Home page with feature overview
- `/auth/login` - User login
- `/auth/register` - User registration
- `/dashboard` - User dashboard (protected)
- `/forms` - Forms list (protected)
- `/forms/[id]` - Form detail and submission (protected)

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Authentication**: JWT tokens with localStorage
