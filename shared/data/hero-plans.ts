import { MB } from '../constants'

export const plans = [
  {
    key: 'free',
    title: 'Free',
    description: 'Basic plan for starters',
    price: 0,
    storage: 286.1 * MB,
    features: ['storage', 'uploads', 'account']
  },
  {
    key: 'pro',
    title: 'Pro',
    description: 'For active users',
    price: 99,
    storage: 476.84 * MB,
    features: ['storage', 'uploads', 'account']
  },
  {
    key: 'premium',
    title: 'Premium',
    description: 'Maximum power and storage',
    price: 199,
    storage: 955 * MB,
    features: ['storage', 'uploads', 'account']
  }
]
