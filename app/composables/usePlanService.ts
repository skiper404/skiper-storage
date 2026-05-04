export const usePlanService = () => {
  const { fetch } = useUserSession()
  const { openCheckout } = useLiqPay()
  const { storagePlan } = useStorage()

  const changePlan = async (plan: StoragePlan) => {
    const upgrade =
      planOrder.indexOf(plan.value) > planOrder.indexOf(storagePlan.value)

    if (upgrade) {
      const payment = await $fetch('/api/payments/liqpay', {
        method: 'POST',
        body: {
          action: 'pay',
          amount: plan.price,
          currency: plan.currency,
          description: `Upgrade to ${plan.title}`,
          plan: plan.value
        }
      })

      openCheckout(payment)
      return
    }

    await $fetch('/api/user/change-plan', {
      method: 'POST',
      body: { plan: plan.value }
    })

    await $fetch('/api/user/refresh-user')
    await fetch()
  }

  return { changePlan }
}
