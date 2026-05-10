<script setup lang="ts">
const { name, category } = defineProps<{ name: string; category: string }>()
</script>

<template>
  <div class="flex gap-2">
   <Badge
        class="rounded-full px-3 py-1 text-xs font-medium text-white"
        :class="{
          'bg-violet-500/90': category === 'image',
          'bg-sky-500/90': category === 'video',
          'bg-indigo-500/90': category === 'audio'
        }"
      >
        <Icon v-if="category === 'image'" name="lucide:image" size="14" />
        <Icon v-if="category === 'video'" name="lucide:video" size="14" />
        <Icon v-if="category === 'audio'" name="lucide:music" size="14" />

        <span class="capitalize">
          {{ category }}
        </span>
      </Badge>
    <h2 class="text-gray-400">{{ name }}</h2>
  </div>
</template>
