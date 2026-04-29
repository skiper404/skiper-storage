<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { file } = defineProps<{ file: UploadedFile }>()
</script>

<template>
  <NuxtLink
    :to="`/${file.category}/${file.id}`"
    class="flex flex-col items-center gap-2 mx-auto"
  >
    <FilePreview :file="file" />
    <span
      class="text-xs text-center w-28 truncate text-gray-400"
      :title="file.originalName"
    >
      {{ file.originalName }}
    </span>
  </NuxtLink>
</template>
