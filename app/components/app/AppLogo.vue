<script setup lang="ts">
const { appName } = useAppConfig()
</script>

<template>
  <NuxtLink
    class="flex items-center gap-2 text-gray-100 hover:scale-105 transition"
    to="/"
  >
    <Icon name="lucide:cloud-fog" size="30" class="rounded-xl p-1" />
    <span class="font-light">{{ appName }}</span>
  </NuxtLink>
</template>
