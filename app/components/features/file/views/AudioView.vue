<script lang="ts" setup>
import type { File } from '~~/shared/types/file'

const props = defineProps<{ file: File }>()

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}/url`)

const src = computed(() => data.value?.url || '')
</script>

<template>
  <div v-if="file.category === 'audio'" class="flex flex-col items-center gap-8">
    <div
      class="absolute inset-0 -z-10 flex flex-col items-center justify-center rounded-2xl bg-gray-200 text-indigo-500 opacity-40 blur-2xl dark:bg-gray-800"
    >
      <Icon name="lucide:file-music" size="500" />
    </div>

    <div
      class="flex flex-col items-center justify-center rounded-2xl border bg-gray-200 text-indigo-500 dark:bg-gray-800"
    >
      <Icon name="lucide:file-music" size="300" />
    </div>

    <audio :src="src" controls class="w-full overflow-hidden rounded-2xl bg-gray-500"></audio>
  </div>
</template>
