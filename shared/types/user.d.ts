import type { Plan, Role } from '~~/prisma/generated/enums'

declare module '#auth-utils' {
  interface User {
    id: string
    email?: string | null
    username: string
    image?: string | null
    role: Role
    plan: Plan
    isBlocked: boolean
    isDeleted: boolean
  }
}

export {}
