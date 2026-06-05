<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'blocked'] })

const { t } = useI18n()
const { user, fetch } = useUserSession()

const config = useRuntimeConfig()
useHead({ title: `Success payment | ${config.public.appName}` })

onMounted(async () => {
  await $fetch('/api/user/refresh-user')
  await fetch()
})
</script>
<template>
  <div class="mt-20 flex flex-col items-center justify-center gap-2">
    <div>{{ t('domain.plan.success.title') }}</div>
    <div>{{ t('domain.plan.success.description', { plan: user?.plan }) }}</div>
    <NuxtLink to="/dashboard/plan">
      <Button variant="secondary">{{ t('ui.buttons.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
