<script setup lang="ts">
const { user, fetch } = useUserSession()
const { appName } = useAppConfig()
const { openCheckout } = useLiqPay()

definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Storage Plan | ${appName}` })

const { data } = useFetch<UploadedFile[]>(() => `/api/files/files`)
const files = computed(() => data.value ?? [])

const storagePlan = computed(
  () => (user.value?.plan as PlanEnum) ?? PlanEnum.FREE
)

const plans: StoragePlan[] = [
  {
    title: 'Free',
    description: 'Good for getting started and testing the platform',
    price: 0,
    currency: 'UAH',
    storage: '300 MB storage',
    value: PlanEnum.FREE
  },
  {
    title: 'Pro',
    description: 'Perfect for everyday usage and personal storage',
    price: 99,
    currency: 'UAH',
    storage: '500 MB storage',
    value: PlanEnum.PRO
  },
  {
    title: 'Premium',
    description: 'For power users who need more space and flexibility',
    price: 199,
    currency: 'UAH',
    storage: '1 GB storage',
    value: PlanEnum.PREMIUM
  }
]

const changePlan = async (plan: StoragePlan) => {
  try {
    const payment = await $fetch('/api/payments/liqpay', {
      method: 'POST',
      body: {
        action: 'pay',
        amount: plan.price,
        currency: plan.currency,
        description: `Upgrade to ${plan.title} Plan`
      }
    })
    openCheckout(payment)
    await $fetch('/api/user/refresh-user')
  } catch (e) {
    await fetch()
  } finally {
    await fetch()
  }
}

const getPlanAction = (current: PlanEnum, target: PlanEnum) => {
  const planOrder = ['FREE', 'PRO', 'PREMIUM']
  if (current === target) return 'Current plan'

  const currentIndex = planOrder.indexOf(current)
  const targetIndex = planOrder.indexOf(target)

  return targetIndex > currentIndex ? 'Upgrade' : 'Downgrade'
}
</script>

<template>
  <div class="flex flex-col gap-2 text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Storage Plan</h2>

    <FilesInfoBar :files="files" />

    <div>
      My current plan:
      <Badge :class="['text-primary capitalize']" variant="secondary">{{
        storagePlan
      }}</Badge>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="plan in plans"
        :class="[
          'rounded-2xl border-2 p-6 flex flex-col justify-between',
          {
            'border-zinc-200 dark:border-zinc-800':
              plan.value === PlanEnum.FREE,
            'border-violet-300 dark:border-violet-950':
              plan.value === PlanEnum.PRO,
            'border-yellow-300 dark:border-yellow-500':
              plan.value === PlanEnum.PREMIUM
          }
        ]"
      >
        <div>
          <h3 class="text-lg font-semibold">{{ plan.title }}</h3>
          <p class="text-sm mt-2">
            {{ plan.description }}
          </p>

          <div class="mt-6 text-2xl font-bold">
            {{ plan.price }} {{ plan.currency }}
          </div>
          <div class="text-sm">{{ plan.storage }}</div>
        </div>
        <Button
          variant="secondary"
          :class="[
            'mt-6 w-full',
            {
              'bg-zinc-800 text-gray-200': plan.value === PlanEnum.FREE,
              'bg-violet-400 dark:bg-violet-900 text-gray-200':
                plan.value === PlanEnum.PRO,
              'bg-yellow-200 dark:bg-yellow-300/80':
                plan.value === PlanEnum.PREMIUM
            }
          ]"
          :disabled="storagePlan === plan.value"
          @click="changePlan(plan)"
          >{{ getPlanAction(storagePlan, plan.value) }}</Button
        >
      </div>
    </div>
  </div>
</template>
