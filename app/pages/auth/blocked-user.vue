<script setup lang="ts">
definePageMeta({
  layout: 'guest'
})

const config = useRuntimeConfig()
useHead({ title: `Blocked user | ${config.public.appName}` })

const { t } = useI18n()
const { clear } = useUserSession()

const items = [
  t('features.auth.blocked.items.first'),
  t('features.auth.blocked.items.second'),
  t('features.auth.blocked.items.third')
]

const handleLogout = async () => {
  await clear()
  await navigateTo('/auth/login-user')
}
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4">
    <div class="bg-card border-border w-full max-w-md rounded-2xl border p-8 shadow-sm">
      <div class="flex flex-col items-center text-center">
        <div class="bg-destructive/10 text-destructive mb-4 flex size-14 items-center justify-center rounded-full">
          <Icon name="lucide:shield-alert" class="size-7" />
        </div>

        <h1 class="text-foreground text-2xl font-semibold">
          {{ t('features.auth.blocked.title') }}
        </h1>

        <p class="text-muted-foreground mt-3 text-sm leading-6">
          {{ t('features.auth.blocked.description') }}
        </p>

        <div class="bg-muted/50 mt-6 w-full rounded-xl border p-4 text-left">
          <p class="text-foreground text-sm font-medium">{{ t('features.auth.blocked.nextTitle') }}</p>

          <ul class="text-muted-foreground mt-2 space-y-2 text-sm leading-6">
            <li v-for="item in items" :key="item">• {{ item }}</li>
          </ul>
        </div>

        <div class="mt-6 flex items-center gap-2 text-sm">
          <Icon name="lucide:mail" class="text-muted-foreground size-4" />

          <a href="mailto:skiper-storage@support.com" class="text-primary hover:underline">
            skiper-storage@support.com
          </a>
        </div>

        <Button class="mt-8 w-full" @click="handleLogout">
          {{ t('ui.buttons.ok') }}
        </Button>
      </div>
    </div>
  </div>
</template>
