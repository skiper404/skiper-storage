<script setup lang="ts">
const { files } = useFetchedFiles()

const categories = ['audio', 'video', 'image']
</script>

<template>
  <div class="bg-secondary flex flex-col gap-4 rounded-lg p-4 font-bold text-gray-500 dark:text-gray-300">
    <div class="flex items-center gap-2">
      <Badge class="bg-chart-2 h-7 rounded-lg text-gray-200 capitalize"> Files: {{ files.length }} </Badge>

      <CategoryInfo v-for="category in categories" :key="category" :category="category" />
    </div>
    <StorageProgres />
  </div>
</template>
