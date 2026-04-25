<script setup lang="ts">
const { appName } = useAppConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="flex items-center justify-center bg-blue-500 h-6 dark:bg-gray-800 rounded-t-2xl"
  >
    <span class="text-xs text-primary-foreground dark:text-primary">
      © {{ year }} {{ appName }}
    </span>
  </footer>
</template>

