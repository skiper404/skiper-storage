<script setup lang="ts">
import type { UploadedFile } from '~/types/uploaded-file.type'

const props = defineProps<{ file: UploadedFile }>()

const fileUrl = computed(() => `/files/${props.file.pathname}`)
</script>

<template>
  <video :src="fileUrl" controls class="aspect-video"></video>
</template>
