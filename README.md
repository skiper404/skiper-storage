# Nuxt Storage

A modern file storage and management platform built with Nuxt 4 and a full TypeScript fullstack ecosystem.

This project demonstrates a production-ready architecture with authentication, file uploads, cloud blob storage, internationalization, and a clean UI system.

## Goal of the project

This project is built as a portfolio-grade fullstack application to demonstrate:

- real-world Nuxt 4 architecture
- secure authentication flow
- file storage workflows
- scalable frontend structure
- modern developer experience

## ✨ Features

- 🔐 Authentication (NextAuth via @sidebase/nuxt-auth)
- ☁️ Cloud file storage (Vercel Blob / Nuxthub integration)
- 📁 File management system (upload, preview, delete, metadata)
- 🌍 Internationalization (i18n with multiple locales)
- 🎨 Modern UI (Tailwind CSS + shadcn-nuxt components)
- 🌙 Dark mode support (Nuxt color mode)
- ⚡ Optimized DX (Nuxt 4, Vite, TypeScript)
- 🧠 Form validation (VeeValidate + Zod)
- 🗄️ Database layer (Prisma + PostgreSQL)
- 🧩 Scalable architecture (stores, composables, modules)

---

## 🧱 Tech Stack

- **Framework:** Nuxt 4
- **Frontend:** Vue 3, Tailwind CSS, shadcn-nuxt
- **Auth:** NextAuth / Sidebase Nuxt Auth
- **Database:** PostgreSQL + Prisma
- **Storage:** Vercel Blob / Nuxthub
- **State:** Pinia
- **Validation:** Zod + VeeValidate
- **Utilities:** VueUse, DayJS, clsx, tailwind-merge

---

## 🚀 Getting Started

### 1. Install dependencies

npm install

```bash
npm install
```

### 2. Create .env file

# Docker Image (if needed)

POSTGRES_USER='root'
POSTGRES_PASSWORD='1234'
POSTGRES_DB='image-storage'
DATABASE_URL='postgres://XXXX'

# R2 Account Token

R2_ACCESS_KEY_ID='XXXX'
R2_SECRET_ACCESS_KEY='XXXX'
R2_ENDPOINT='XXXX'
R2_BUCKET_NAME='XXXX'

# Auth

AUTH_SECRET='XXXX'
AUTH_ORIGIN="http://localhost:3000/api/auth"

GITHUB_CLIENT_ID = 'XXXX'
GITHUB_CLIENT_SECRET = 'XXXX'

GOOGLE_CLIENT_ID = 'XXXX'
GOOGLE_CLIENT_SECRET = 'XXXX'

### 2. Run database

```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server

```bash
npm run dev
```
