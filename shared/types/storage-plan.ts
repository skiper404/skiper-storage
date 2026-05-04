import type { Plan } from '~~/prisma/generated/enums'

export interface StoragePlan {
  key: string
  title: string
  description: String
  price: number
  currency: string
  storage: number
  value: Plan
}
