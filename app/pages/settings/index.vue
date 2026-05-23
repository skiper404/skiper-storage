<script setup lang="ts">
const { t } = useI18n()
const { appName } = useAppConfig()
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Settings | ${appName}` })
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <AppHeading :title="t('pages.settings.title')" :description="t('pages.settings.description')" />
    <SettingsUserHeader />
    <SettingsAccountUpdate />
    <SettingsUserPlan />
    <SettingsAccountDelete />
  </div>
</template>
