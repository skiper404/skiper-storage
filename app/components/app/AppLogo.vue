<script setup lang="ts">
const { appName } = useAppConfig()
</script>

<template>
  <NuxtLink
    class="flex items-center gap-2 text-primary text-lg font-semibold"
    to="/"
  >
    <Icon name="lucide:cloudy" size="20" />
    <span>{{ appName }}</span>
  </NuxtLink>
</template>
