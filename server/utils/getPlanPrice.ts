import { Plan } from '~~/prisma/generated/client'

export const getPlanPrice = (plan: Plan) => {
  if (plan === 'PRO') return 10
  if (plan === 'PREMIUM') return 100
  return 0
}
