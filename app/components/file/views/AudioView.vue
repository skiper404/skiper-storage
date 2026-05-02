<script lang="ts" setup>
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const props = defineProps<{ file: UploadedFile }>()

const fileUrl = computed(() => `/api/files/${props.file.pathname}`)
</script>

<template>
  <div
    v-if="file.category === 'audio'"
    class="flex flex-col items-center gap-8"
  >
    <div
      class="text-indigo-500 bg-gray-200 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center border"
    >
      <Icon name="lucide:file-music" size="300" />
    </div>

    <audio
      :src="fileUrl"
      controls
      class="w-full bg-gray-500 rounded-2xl overflow-hidden"
    ></audio>
  </div>
</template>
