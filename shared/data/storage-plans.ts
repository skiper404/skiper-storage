import { GB, MB } from '../constants'
import type { StoragePlan } from '../types/storage-plan'
import { Plan } from '~~/prisma/generated/enums'

export const plans: StoragePlan[] = [
  {
    key: 'free',
    title: 'Free',
    description: 'description',
    price: 0,
    currency: 'UAH',
    storage: 300 * MB,
    value: Plan.FREE
  },
  {
    key: 'pro',
    title: 'pro',
    description: 'description',
    price: 99,
    currency: 'UAH',
    storage: 500 * MB,
    value: Plan.PRO
  },
  {
    key: 'premium',
    title: 'Premium',
    description: 'description',
    price: 199,
    currency: 'UAH',
    storage: 1 * GB,
    value: Plan.PREMIUM
  }
]
