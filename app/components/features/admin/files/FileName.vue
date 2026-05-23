<script setup lang="ts">
const props = defineProps<{ filename: string }>()
</script>

<template>
  <p class="text-foreground truncate text-sm font-medium">
    {{ filename }}
  </p>
</template>
