<script setup lang="ts">
import { filesize } from 'filesize'

import { Plan } from '~~/prisma/generated/enums'

const props = defineProps<{ plan: StoragePlan }>()
const { fetch } = useUserSession()
const { openCheckout } = useLiqPay()
const { storagePlan, totalFileSizeInBytes } = useStorage()
const { isUpgrade, getAction } = usePlanLogic()

const changePlan = async (plan: StoragePlan) => {
  const upgrade = isUpgrade(storagePlan.value, plan.value)

  if (upgrade) {
    const payment = await $fetch('/api/payments/liqpay', {
      method: 'POST',
      body: {
        action: 'pay',
        amount: plan.price,
        currency: plan.currency,
        description: `Upgrade to ${plan.title} Plan`,
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
  await fetch()
}
</script>

<template>
  <div
    :class="[
      'rounded-2xl border-2 p-6 flex flex-col justify-between',
      {
        'border-zinc-200 dark:border-zinc-800': plan.value === Plan.FREE,
        'border-violet-300 dark:border-violet-950': plan.value === Plan.PRO,
        'border-yellow-300 dark:border-yellow-500': plan.value === Plan.PREMIUM
      }
    ]"
  >
    <div>
      <h3 class="text-lg font-semibold">{{ plan.title }}</h3>
      <p class="text-sm mt-2 min-h-20">
        {{ plan.description }}
      </p>

      <div class="mt-6 text-accent-foreground font-bold">
        {{ plan.price }} {{ plan.currency }}
      </div>
      <div class="text-sm">{{ filesize(plan.storage) }}</div>
    </div>

    <Dialog>
      <DialogTrigger
        :disabled="
          storagePlan === plan.value || totalFileSizeInBytes > plan.storage
        "
      >
        <Button
          variant="secondary"
          :class="[
            'mt-6 w-full',
            {
              'bg-zinc-800 text-gray-200': plan.value === Plan.FREE,
              'bg-violet-400 dark:bg-violet-900 text-gray-200':
                plan.value === Plan.PRO,
              'bg-yellow-200 dark:bg-yellow-300/80': plan.value === Plan.PREMIUM
            }
          ]"
          :disabled="
            storagePlan === plan.value || totalFileSizeInBytes > plan.storage
          "
        >
          {{ getAction(storagePlan, plan.value) }}
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-md bg-secondary">
        <DialogHeader>
          <DialogTitle class="text-lg font-semibold">
            Confirm change plan
          </DialogTitle>

          <DialogDescription class="mt-2 text-sm text-muted-foreground">
            You are about to switch to the
            <span class="font-medium text-foreground">
              {{ plan.title }}
            </span>
            plan.
          </DialogDescription>
        </DialogHeader>
        <div
          class="mt-6 rounded-xl border dark:bg-zinc-900 bg-zinc-300 p-4 flex flex-col gap-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Plan</span>
            <span class="font-medium">{{ plan.title }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Storage</span>
            <span class="font-medium">{{ filesize(plan.storage) }}</span>
          </div>

          <div class="border-t pt-3 flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Price</span>
            <span class="text-xl font-bold">
              {{
                isUpgrade(storagePlan, plan.value)
                  ? `${plan.price} ${plan.currency}`
                  : 'Free'
              }}
            </span>
          </div>
        </div>

        <p class="mt-4 text-sm text-muted-foreground text-center">
          {{ plan.description }}
        </p>

        <div class="mt-6 flex gap-3 justify-center">
          <DialogClose as-child>
            <Button variant="outline" class="flex-1"> Cancel </Button>
          </DialogClose>

          <DialogClose as-child>
            <Button class="flex-1" @click="changePlan(plan)">
              {{ plan.price === 0 ? 'Change plan' : 'Buy plan' }}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
