import { Plan } from '~~/prisma/generated/enums'

export const usePlanLogic = () => {
  const order = [Plan.FREE, Plan.PRO, Plan.PREMIUM]

  const isUpgrade = (current: Plan, target: Plan) =>
    order.indexOf(target) > order.indexOf(current)

  const getAction = (current: Plan, target: Plan) => {
    if (current === target) return 'Current plan'

    return isUpgrade(current, target) ? '↑ Upgrade' : '↓ Downgrade'
  }

  return { order, isUpgrade, getAction }
}
