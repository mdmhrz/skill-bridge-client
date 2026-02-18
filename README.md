# Skill Bridge Client

Frontend application for **Skill Bridge**, an online tutoring platform.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Better Auth client integration**.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- better-auth (client)
- t3-env + zod for environment validation

## Prerequisites

- Node.js 20+
- npm / pnpm / yarn
- Running Skill Bridge backend API

## Environment Variables

Create a `.env` file in this directory with the following values:

```env
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
AUTH_URL=http://localhost:5000

NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Environment schema is validated in `src/env.ts`.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Auth API Rewrite

The client proxies auth calls to backend via Next.js rewrite:

- `/api/auth/:path*` -> `${NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`

Configured in `next.config.ts`.

## App Structure (High Level)

```text
src/app
├── (rootLayout)       # Public pages (home, tutors, about, contact)
├── (authLayout)       # Login / Signup pages
└── (dashboardLayout)  # Student / Tutor / Admin dashboard areas
```

## Key Frontend Features

- Home page with hero search and featured tutors
- Tutors listing page with filtering, sorting, and pagination
- Tutor details page
- Role-based dashboard layouts (student, tutor, admin)
- Better Auth-based login/signup flow (including social login)

## Notes

- Keep backend and frontend URLs consistent between local and production.
- Do not commit real secrets to `.env`.
