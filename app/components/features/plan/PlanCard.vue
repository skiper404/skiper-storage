<script setup lang="ts">
import { filesize } from 'filesize'

import { Plan } from '~~/prisma/generated/enums'

const props = defineProps<{ plan: StoragePlan }>()

const { fetch } = useUserSession()
const { openCheckout } = useLiqPay()
const { storagePlan, totalFileSizeInBytes } = useStorage()
const { isUpgrade, getAction } = usePlanLogic()
const { t } = useI18n()

const title = computed(() => t(`domain.plan.${props.plan.key}.title`))

const description = computed(() => t(`domain.plan.${props.plan.key}.description`))

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
      'flex flex-col justify-between rounded-2xl border-2 p-6',
      {
        'border-zinc-200 dark:border-zinc-800': plan.value === Plan.FREE,

        'border-violet-300 dark:border-violet-950': plan.value === Plan.PRO,

        'border-yellow-300 dark:border-yellow-500': plan.value === Plan.PREMIUM
      }
    ]"
  >
    <div>
      <h3 class="text-lg font-semibold">
        {{ title }}
      </h3>

      <p class="mt-2 min-h-20 text-sm">
        {{ description }}
      </p>

      <div class="text-accent-foreground mt-6 font-bold">{{ plan.price }} {{ plan.currency }}</div>

      <div class="text-sm">
        {{ filesize(plan.storage) }}
      </div>
    </div>

    <Dialog>
      <DialogTrigger :disabled="storagePlan === plan.value || totalFileSizeInBytes > plan.storage">
        <Button
          variant="secondary"
          :class="[
            'mt-6 w-full',
            {
              'bg-zinc-800 text-gray-200': plan.value === Plan.FREE,

              'bg-violet-400 text-gray-200 dark:bg-violet-900': plan.value === Plan.PRO,

              'bg-yellow-200 dark:bg-yellow-300/80': plan.value === Plan.PREMIUM
            }
          ]"
          :disabled="storagePlan === plan.value || totalFileSizeInBytes > plan.storage"
        >
          {{ t(`domain.plan.actions.${getAction(storagePlan, plan.value)}`) }}
        </Button>
      </DialogTrigger>

      <DialogContent class="bg-secondary sm:max-w-md">
        <DialogHeader>
          <DialogTitle class="text-lg font-semibold">
            {{ t('domain.plan.confirmTitle') }}
          </DialogTitle>

          <DialogDescription class="text-muted-foreground mt-2 text-sm">
            {{
              t('domain.plan.confirmDescription', {
                plan: title
              })
            }}
          </DialogDescription>
        </DialogHeader>

        <div class="mt-6 flex flex-col gap-3 rounded-xl border bg-zinc-300 p-4 dark:bg-zinc-900">
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground text-sm">
              {{ t('domain.plan.labels.plan') }}
            </span>

            <span class="font-medium">
              {{ title }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-muted-foreground text-sm">
              {{ t('domain.plan.labels.storage') }}
            </span>

            <span class="font-medium">
              {{ filesize(plan.storage) }}
            </span>
          </div>

          <div class="flex items-center justify-between border-t pt-3">
            <span class="text-muted-foreground text-sm">
              {{ t('domain.plan.labels.price') }}
            </span>

            <span class="text-xl font-bold">
              {{ isUpgrade(storagePlan, plan.value) ? `${plan.price} ${plan.currency}` : t('domain.plan.freeLabel') }}
            </span>
          </div>
        </div>

        <p class="text-muted-foreground mt-4 text-center text-sm">
          {{ description }}
        </p>

        <div class="mt-6 flex justify-center gap-3">
          <DialogClose as-child>
            <Button variant="outline" class="flex-1">
              {{ t('domain.plan.cancel') }}
            </Button>
          </DialogClose>

          <DialogClose as-child>
            <Button class="flex-1" @click="changePlan(plan)">
              {{ plan.price === 0 ? t('domain.plan.change') : t('domain.plan.buy') }}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
