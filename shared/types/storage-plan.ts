import type { Plan } from '~~/prisma/generated/enums'

export interface StoragePlan {
  title: string
  description: String
  price: number
  currency: string
  storage: number
  value: Plan
}
