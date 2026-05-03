export enum PlanEnum {
  FREE = 'FREE',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface StoragePlan {
  title: string
  description: String
  price: number
  currency: string
  storage: string
  value: PlanEnum
}
