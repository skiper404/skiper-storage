<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const props = defineProps<{ file: File }>()

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}/url`)
</script>

<template>
  <video
    :src="data?.url"
    class="absolute inset-0 -z-10 aspect-video h-full w-full rounded-2xl opacity-40 blur-2xl"
  ></video>

  <video :src="data?.url" controls class="aspect-video"></video>
</template>
