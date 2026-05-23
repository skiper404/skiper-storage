<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'blocked'] })

const { t } = useI18n()
const { user, fetch } = useUserSession()

onMounted(async () => {
  await $fetch('/api/user/refresh-user')
  await fetch()
})
</script>
<template>
  <div class="mt-20 flex flex-col items-center justify-center gap-2">
    <div>{{ t('domain.plan.success.title') }}</div>
    <div>{{ t('domain.plan.success.description', { plan: user?.plan }) }}</div>
    <NuxtLink to="/plan">
      <Button variant="secondary">{{ t('ui.buttons.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
