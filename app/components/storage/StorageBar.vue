<script setup lang="ts">
const { files } = useFetchedFiles()
const { t } = useI18n()
</script>

<template>
  <div
    class="flex gap-4 flex-col p-4 rounded-lg bg-secondary font-bold text-gray-500 dark:text-gray-300"
  >
    <div class="flex items-center gap-2">
      <Badge class="h-7 bg-chart-2 text-gray-200 rounded-lg">
        {{ t('ui.info.totalFiles') }}: {{ files.length }}
      </Badge>
      <CategoryInfo category="audio" />
      <CategoryInfo category="video" />
      <CategoryInfo category="image" />
    </div>
    <StorageProgres />
  </div>
</template>
