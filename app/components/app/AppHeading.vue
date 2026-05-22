<script setup lang="ts">
const props = defineProps<{ title: string; description: string }>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        {{ props.title }}
      </h1>

      <p class="text-muted-foreground mt-1 text-sm">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
