<script setup lang="ts">
const config = useRuntimeConfig()
const { user } = useUserSession()
</script>

<template>
  <NuxtLink class="text-primary flex items-center gap-2 text-lg font-semibold" :to="user ? '/dashboard' : '/'">
    <Icon name="lucide:cloudy" size="20" />
    <span>{{ config.public.appName }}</span>
  </NuxtLink>
</template>
