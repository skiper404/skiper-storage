<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const { files } = defineProps<{ files: File[] }>()
</script>

<template>
  <div class="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
    <FileItem v-for="file in files" :file="file" :key="file.key" />
  </div>
</template>
