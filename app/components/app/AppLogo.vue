<script setup lang="ts">
const { appName } = useAppConfig()
</script>

<template>
  <NuxtLink class="flex items-center gap-2 text-gray-100" to="/">
    <Icon name="lucide:cloudy" size="20" class="rounded-xl p-1" />
    <span class="font-extralight">{{ appName }}</span>
  </NuxtLink>
</template>
