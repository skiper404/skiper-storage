import type { Plan, Role } from '~~/prisma/generated/enums'

export interface AdminUser {
  id: string
  email: string
  username: string | null
  image: string | null
  role: Role
  plan: Plan
  isBlocked: boolean
  isDeleted: boolean

  _count: {
    files: number
  }
}
