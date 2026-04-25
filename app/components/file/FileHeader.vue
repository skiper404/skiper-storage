<script setup lang="ts">
const { name, category } = defineProps<{ name: string; category: string }>()
</script>

<template>
  <div class="flex gap-2">
    <Badge
      variant="secondary"
      :class="[
        'text-gray-100',
        {
          'bg-violet-500': category === 'image',
          'bg-indigo-500': category === 'audio',
          'bg-sky-500': category === 'video',
        },
      ]"
    >
      {{ category }}
    </Badge>
    <h2 class="text-gray-400">{{ name }}</h2>
  </div>
</template>
