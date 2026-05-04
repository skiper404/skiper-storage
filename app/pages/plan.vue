<script setup lang="ts">
import { plans } from '~~/shared/data/storage-plans'

const { appName } = useAppConfig()

definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Storage Plan | ${appName}` })
</script>

<template>
  <div class="space-y-4 text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Storage Plan</h2>
    <StorageBar />
    <div class="grid md:grid-cols-3 gap-6">
      <PlanCard :plan="plan" v-for="plan in plans" :key="plan.value" />
    </div>
  </div>
</template>
