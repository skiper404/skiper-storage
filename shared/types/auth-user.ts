import type { Plan, Role } from '~~/prisma/generated/enums'

export type AuthUser = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: Role
  plan: Plan
}
