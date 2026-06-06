<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const props = defineProps<{ file: File }>()

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}/url`)

const src = computed(() => data.value?.url || '')
</script>

<template>
  <video :src="src" class="absolute inset-0 -z-10 aspect-video h-full w-full rounded-2xl opacity-40 blur-2xl"></video>

  <video :src="src" controls class="aspect-video"></video>
</template>
