<script setup lang="ts">
import type { Plan } from '~~/prisma/generated/enums'

const { user } = useUserSession()
const { openCheckout } = useLiqPay()

const setPlan = async (plan: Plan) => {
  const payment = await $fetch('/api/payments/liqpay', {
    method: 'POST',
    body: { plan }
  })

  openCheckout(payment)
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        size="sm"
        class="border-violet-700 bg-orange-400 hover:bg-orange-300 text-orange-100"
      >
        Upgrage
      </Button>
    </DialogTrigger>
    <DialogContent class="bg-primary-foreground">
      <DialogHeader>
        <DialogTitle>Upgrade Storage</DialogTitle>
        <DialogDescription
          >You can add storage space by purchasing
          <Badge
            variant="secondary"
            class="text-primary dark:bg-violet-800 bg-violet-300"
            >Pro</Badge
          >
          or
          <Badge
            variant="secondary"
            class="text-primary dark:bg-yellow-500 bg-yellow-300"
            >Premium</Badge
          >
          Plan
          <div class="flex gap-2 mt-4 items-center">
            <div>Current Plan: {{ user?.plan }}</div>

            <Button
              variant="outline"
              size="sm"
              :class="{
                'text-primary dark:bg-gray-500 bg-gray-300':
                  user?.plan === 'FREE'
              }"
              >Free</Button
            >
            <Button
              variant="outline"
              size="sm"
              :class="{
                'text-primary dark:bg-violet-500 bg-violet-300':
                  user?.plan === 'PRO'
              }"
              @click="setPlan('PRO')"
              >Buy for 10 | Pro</Button
            >
            <Button
              variant="outline"
              size="sm"
              :class="{
                'text-primary dark:bg-yellow-500 bg-yellow-300':
                  user?.plan === 'PREMIUM'
              }"
              @click="setPlan('PREMIUM')"
            >
              Buy for 100 | Premium</Button
            >
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
