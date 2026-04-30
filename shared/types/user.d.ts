import type { Plan, Role } from '~~/prisma/generated/enums'

declare module '#auth-utils' {
  interface User {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
    role: Role
    plan: Plan
  }
}

export {}
