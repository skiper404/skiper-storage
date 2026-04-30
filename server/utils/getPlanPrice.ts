import { Plan } from '~~/prisma/generated/client'

export const getPlanPrice = (plan: Plan) => {
  if (plan === 'PRO') return '10.00'
  if (plan === 'PREMIUM') return '100.00'
  return '0'
}
