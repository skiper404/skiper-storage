<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const props = defineProps<{ file: UploadedFile }>()

const fileUrl = computed(() => `/api/files/${props.file.pathname}`)
</script>

<template>
  <div class="h-100">
    <img
      :src="fileUrl"
      :alt="file.originalName"
      class="h-full w-full object-contain"
    />
  </div>
</template>
