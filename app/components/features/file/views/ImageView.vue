<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const props = defineProps<{ file: File }>()

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}/url`)

const src = computed(() => data.value?.url || '')
</script>

<template>
  <div class="h-100">
    <NuxtImg
      :src="src"
      :alt="file.fileName"
      class="absolute inset-0 -z-10 h-full w-full rounded-2xl object-cover opacity-40 blur-2xl"
    />

    <NuxtImg :src="src" :alt="file.fileName" class="h-full w-full rounded-2xl object-contain" />
  </div>
</template>
