<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const props = defineProps<{ file: UploadedFile }>()

const fileUrl = computed(() => `/api/files/${props.file.pathname}`)
</script>

<template>
  <video :src="fileUrl" controls class="aspect-video"></video>
</template>
