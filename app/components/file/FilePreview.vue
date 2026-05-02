<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { file } = defineProps<{ file: UploadedFile }>()

const isLoaded = ref(false)
const fileUrl = computed(() => `/api/files/${file.pathname}`)

const handleLoaded = () => {
  isLoaded.value = true
}
</script>

<template>
  <div class="relative h-20 w-20">
    <FileItemSkeleton v-if="!isLoaded" class="absolute inset-0" />

    <img
      v-if="file.category === 'image'"
      :src="fileUrl"
      :alt="file.originalName"
      @load="handleLoaded"
      class="h-full w-full object-cover rounded-lg"
      :class="{ 'opacity-0': !isLoaded }"
    />

    <video
      v-else-if="file.category === 'video'"
      :src="fileUrl"
      muted
      preload="metadata"
      playsinline
      @loadeddata="handleLoaded"
      class="h-full w-full object-cover rounded-xl"
      :class="{ 'opacity-0': !isLoaded }"
    ></video>

    <div
      v-else-if="file.category === 'audio'"
      @vue:mounted="handleLoaded"
      class="text-indigo-500 size-20 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center border"
    >
      <Icon name="lucide:file-music" size="50" />
    </div>
  </div>
</template>
