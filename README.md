# Nuxt Storage

A modern fullstack cloud file storage platform built with Nuxt 4, Prisma, PostgreSQL, LiqPay and R2 Cloudflare.

The project is designed as a SaaS-style application with authentication, role-based access, file moderation, subscription plans, and a scalable architecture.

## Goal of the project

This project is built as a portfolio-grade SaaS application to demonstrate real-world fullstack architecture, scalable frontend design, secure authentication, and cloud file management workflows.

## Features

- 🔐 Authentication (email/password, sessions, token system)
- 👤 Role-based access control (USER / ADMIN)
- ☁️ Cloud file storage (images, audio, video)
- 📁 File management (upload, preview, download, delete)
- 🛡️ Admin panel (users/files management, moderation tools)
- 🚫 Blocking system (users & files with reasons)
- 💳 Subscription plans (Free / Pro / Premium)
- 📊 Storage usage tracking per user
- 🌍 Internationalization (multi-language support)
- 🎨 Modern UI system (component-based design system)
- ⚡ Form validation (Zod + VeeValidate)
- 🔔 Notifications & dialogs system

## 🧱 Tech Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS
- **Backend**: Nuxt Server (Nitro)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + Argon2 password hashing
- **Storage**: AWS S3 compatible storage
- **State** management: Pinia
- **Validation**: Zod + VeeValidate
- **UI**: shadcn-nuxt + custom component system
- **Email**: Nodemailer
- **Payments**: LiqPay integration
- **Utilities**: VueUse, DayJS, clsx, tailwind-merge

## 🏗️ Architecture

- app/ — frontend layer (UI, pages, components)
- server/ - backend API (auth, files, payments)
- prisma/ — database layer
- shared/ — shared contracts (schemas, types)
- i18n/ — localization system

## Required env variables

# DATABASE (PostgreSQL)

```bash
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
DATABASE_URL
```

# STORAGE (S3 / Cloudflare R2)

```bash
S3_BUCKET_NAME
S3_ACCOUNT_ID
S3_ENDPOINT
S3_ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY
```

# AUTH (OAuth Providers)

```bash
NUXT_OAUTH_GOOGLE_CLIENT_ID
NUXT_OAUTH_GOOGLE_CLIENT_SECRET
```

# SESSION SECURITY

```bash
NUXT_SESSION_PASSWORD
```

# PAYMENTS (LiqPay)

```bash
LIQPAY_PUBLIC_KEY
LIQPAY_PRIVATE_KEY
```

# APP CONFIG

```bash
NUXT_PUBLIC_APP_URL
MAIL_HOST
MAIL_LOGIN
MAIL_PASSWORD
```
