<script setup lang="ts">
const { appName } = useAppConfig()
</script>

<template>
  <NuxtLink
    class="flex items-center gap-2 bg-secondary text-primary text-lg font-semibold"
    to="/"
  >
    <Icon name="lucide:cloudy" size="20" class="rounded-xl" />
    <span>{{ appName }}</span>
  </NuxtLink>
</template>
