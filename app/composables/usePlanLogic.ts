import { Plan } from '@prisma/client'

export const usePlanLogic = () => {
  const order = [Plan.FREE, Plan.PRO, Plan.PREMIUM]

  const isUpgrade = (current: Plan, target: Plan) => order.indexOf(target) > order.indexOf(current)

  const getAction = (current: Plan, target: Plan) => {
    if (current === target) return 'current'

    return isUpgrade(current, target) ? 'upgrade' : 'downgrade'
  }

  return { order, isUpgrade, getAction }
}
