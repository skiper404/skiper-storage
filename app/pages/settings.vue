<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Settings | ${appName}` })
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Settings</h2>
  </div>
</template>
