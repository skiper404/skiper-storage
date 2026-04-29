<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { files } = defineProps<{ files: UploadedFile[] }>()
const { t } = useI18n()
</script>

<template>
  <div
    class="flex gap-2 flex-col p-2 rounded-2xl backdrop-blur-xs dark:bg-gray-800/90 bg-blue-100/90"
  >
    <div class="flex items-center gap-2">
      <Badge
        class="text-gray-500 dark:text-gray-300 bg-green-400 h-7 text-bold dark:bg-green-800"
      >
        {{ t('ui.info.totalFiles') }}: {{ files.length }}
      </Badge>
      <CategoryInfo category="audio" :files="files" />
      <CategoryInfo category="video" :files="files" />
      <CategoryInfo category="image" :files="files" />
    </div>
    <StorageBar :files="files" />
  </div>
</template>
