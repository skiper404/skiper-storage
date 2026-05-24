export const Plan = {
  FREE: 'FREE',
  PRO: 'PRO',
  PREMIUM: 'PREMIUM'
} as const

export type Plan = (typeof Plan)[keyof typeof Plan]
