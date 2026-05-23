<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const { file, size } = defineProps<{ file: File; size: 'sm' | 'md' }>()
const { data } = await useFetch<{ url: string }>(`/api/files/${file.id}/url`)

const isLoaded = ref(false)
const sizes = { sm: 'size-14', md: 'size-20' }
const iconSizes = { sm: 20, md: 50 }

const onLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <div :class="['relative', sizes[size]]">
    <FileBlocked v-if="file.isBlocked" />
    <FileItemSkeleton v-if="!isLoaded" :class="['absolute inset-0', sizes[size]]" />
    <img
      v-if="file.category === 'image'"
      :src="data?.url"
      :alt="file.fileName"
      @load="onLoad"
      loading="lazy"
      decoding="async"
      :class="['h-full w-full rounded-lg object-cover', { 'blur-xs': file.isBlocked }]"
    />

    <video
      v-if="file.category === 'video'"
      :src="data?.url"
      muted
      preload="metadata"
      playsinline
      @loadeddata="onLoad"
      :class="['h-full w-full rounded-xl object-cover', { 'blur-xs': file.isBlocked }]"
    ></video>

    <div
      v-if="file.category === 'audio'"
      @vue:mounted="onLoad"
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
