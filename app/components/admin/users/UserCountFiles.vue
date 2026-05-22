<script setup lang="ts">
const props = defineProps<{ count: number }>()
</script>

<template>
  <div class="hidden sm:block">
    <div class="flex items-center gap-2">
      <Icon name="lucide:files" size="16" class="text-muted-foreground" />
      <span class="font-medium">
        {{ count }}
      </span>
    </div>
  </div>
</template>
