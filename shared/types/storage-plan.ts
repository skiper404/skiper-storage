import type { Plan } from '@prisma/client'

export interface StoragePlan {
  key: string
  title: string
  description: String
  price: number
  currency: string
  storage: number
  value: Plan
}
