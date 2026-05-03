<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { files } = defineProps<{ files: UploadedFile[] }>()
const { t } = useI18n()
</script>

<template>
  <div
    class="flex gap-2 flex-col p-4 rounded-lg bg-secondary font-bold text-gray-500 dark:text-gray-300"
  >
    <div class="flex items-center gap-2">
      <Badge class="h-7 bg-chart-2 text-gray-200">
        {{ t('ui.info.totalFiles') }}: {{ files.length }}
      </Badge>
      <CategoryInfo category="audio" :files="files" />
      <CategoryInfo category="video" :files="files" />
      <CategoryInfo category="image" :files="files" />
    </div>
    <StorageBar :files="files" />
  </div>
</template>
