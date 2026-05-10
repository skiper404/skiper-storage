<script lang="ts" setup>
import type { File } from '~~/prisma/generated/client'

const props = defineProps<{ file: File }>()
const config = useAppConfig()

const fileUrl = computed(() => `${config.S3_PUB_URL}/${props.file.key}`)
</script>

<template>
  <div
    v-if="file.category === 'audio'"
    class="flex flex-col items-center gap-8"
  >
    <div
      class="text-indigo-500 absolute inset-0 blur-2xl opacity-50 -z-10 bg-gray-200 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center"
    >
      <Icon name="lucide:file-music" size="500" />
    </div>

    <div
      class="text-indigo-500 bg-gray-200 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center border"
    >
      <Icon name="lucide:file-music" size="300" />
    </div>

    <audio
      :src="fileUrl"
      controls
      class="w-full bg-gray-500 rounded-2xl overflow-hidden"
    ></audio>
  </div>
</template>
