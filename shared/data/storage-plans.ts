import { GB, MB } from '../constants'
import type { StoragePlan } from '../types/storage-plan'
import { Plan } from '~~/prisma/generated/enums'

export const plans: StoragePlan[] = [
  {
    title: 'Free',
    description: 'Good for getting started and testing the platform',
    price: 0,
    currency: 'UAH',
    storage: 300 * MB,
    value: Plan.FREE
  },
  {
    title: 'Pro',
    description: 'Perfect for everyday usage and personal storage',
    price: 99,
    currency: 'UAH',
    storage: 500 * MB,
    value: Plan.PRO
  },
  {
    title: 'Premium',
    description: 'For power users who need more space and flexibility',
    price: 199,
    currency: 'UAH',
    storage: 1 * GB,
    value: Plan.PREMIUM
  }
]
