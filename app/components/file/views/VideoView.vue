<script setup lang="ts">
import type { File } from '~~/prisma/generated/client'

const props = defineProps<{ file: File }>()
const config = useAppConfig()

const fileUrl = computed(() => `${config.S3_PUB_URL}/${props.file.key}`)
</script>

<template>
  <video
    :src="fileUrl"
    class="aspect-video absolute rounded-2xl inset-0 h-full w-full -z-10 blur-2xl opacity-30"
  ></video>

  <video :src="fileUrl" controls class="aspect-video"></video>
</template>
