import type { Plan, Role } from '~~/prisma/generated/enums'

declare module '#auth-utils' {
  interface User {
    id: string
    email?: string
    name?: string
    image?: string
    role: Role
    plan: Plan
  }
}

export {}
