<script setup lang="ts">
const props = defineProps<{ category: string }>()
</script>

<template>
  <Badge variant="secondary">
    {{ category }}
  </Badge>
</template>
