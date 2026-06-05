<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const { file, size } = defineProps<{ file: File; size: 'sm' | 'md' }>()
const { data, pending } = useFetch<{ url: string }>(`/api/files/${file.id}/url`, { lazy: true })

const sizes = { sm: 'size-14', md: 'size-20' }
const iconSizes = { sm: 20, md: 50 }

const src = computed(() => data.value?.url || '')
const isReady = computed(() => !!data.value?.url)
</script>

<template>
  <div :class="['relative', sizes[size]]">
    <FileBlocked v-if="file.isBlocked" />
    <FileItemSkeleton v-if="pending || !isReady" :class="['absolute inset-0', sizes[size]]" />
    <NuxtImg
      v-if="file.category === 'image'"
      :src="src"
      :alt="file.fileName"
      loading="lazy"
      decoding="async"
      :class="['h-full w-full rounded-lg object-cover', { 'blur-xs': file.isBlocked }]"
    />

    <video
      v-else-if="file.category === 'video'"
      :src="src"
      muted
      preload="metadata"
      playsinline
      :class="['h-full w-full rounded-xl object-cover', { 'blur-xs': file.isBlocked }]"
    ></video>

    <div
      v-else-if="file.category === 'audio'"
      :class="[
        'flex items-center justify-center rounded-lg border bg-gray-200 text-indigo-500 dark:bg-gray-800',
        sizes[size],
        { 'blur-xs': file.isBlocked }
      ]"
    >
      <Icon name="lucide:file-music" :size="iconSizes[size]" />
    </div>
  </div>
</template>
