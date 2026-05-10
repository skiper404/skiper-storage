<script setup lang="ts">
import type { File } from '~~/prisma/generated/client'

const { file } = defineProps<{ file: File }>()
const config = useAppConfig()
const isLoaded = ref(false)

const onLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <div class="relative h-20 w-20">
    <FileItemSkeleton v-if="!isLoaded" class="absolute inset-0" />
    <img
      v-if="file.category === 'image'"
      :src="`${config.S3_PUB_URL}/${file.key}`"
      :alt="file.fileName"
      @load="onLoad"
      loading="lazy"
      decoding="async"
      :class="['h-full w-full object-cover rounded-lg']"
    />

    <video
      v-if="file.category === 'video'"
      :src="`${config.S3_PUB_URL}/${file.key}`"
      muted
      preload="metadata"
      playsinline
      @loadeddata="onLoad"
      :class="['h-full w-full object-cover rounded-xl']"
    ></video>

    <div
      v-if="file.category === 'audio'"
      @vue:mounted="onLoad"
      class="text-indigo-500 size-20 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center border"
    >
      <Icon name="lucide:file-music" size="50" />
    </div>
  </div>
</template>
