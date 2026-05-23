<script setup lang="ts">
import { plans } from '~~/shared/data/storage-plans'

const { t } = useI18n()
const { appName } = useAppConfig()

definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Storage Plan | ${appName}` })
</script>

<template>
  <div class="space-y-4">
    <AppHeading :title="t('pages.plan.title')" :description="t('pages.plan.description')" />
    <StorageBar />
    <div class="grid gap-6 md:grid-cols-3">
      <PlanCard :plan="plan" v-for="plan in plans" :key="plan.value" />
    </div>
  </div>
</template>
