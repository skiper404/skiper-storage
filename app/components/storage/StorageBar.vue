<script setup lang="ts">
const { files } = useFetchedFiles()
const { t } = useI18n()
</script>

<template>
  <div class="bg-secondary flex flex-col gap-4 rounded-lg p-4 font-bold text-gray-500 dark:text-gray-300">
    <div class="flex items-center gap-2">
      <Badge class="bg-chart-2 h-7 rounded-lg text-gray-200 capitalize">
        {{ t('ui.info.totalFiles') }}: {{ files.length }}
      </Badge>
      <CategoryInfo category="audio" />
      <CategoryInfo category="video" />
      <CategoryInfo category="image" />
    </div>
    <StorageProgres />
  </div>
</template>
