<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { files } = defineProps<{ files: UploadedFile[] }>()
</script>

<template>
  <div
    class="grid lg:grid-cols-8 sm:grid-cols-4 md:grid-cols-5 grid-cols-3 space-y-4 mt-4"
  >
    <FileItem v-for="file in files" :file="file" :key="file.id" />
  </div>
</template>
