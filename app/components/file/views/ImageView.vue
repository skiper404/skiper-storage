<script setup lang="ts">
import type { File } from '~~/prisma/generated/client'

const props = defineProps<{ file: File }>()
const config = useAppConfig()

const fileUrl = computed(() => `${config.S3_PUB_URL}/${props.file.key}`)
</script>

<template>
  <div class="h-100">
    <img
      :src="fileUrl"
      :alt="file.fileName"
      class="h-full w-full -z-10 blur-2xl opacity-30 object-cover rounded-2xl absolute inset-0"
    />

    <img
      :src="fileUrl"
      :alt="file.fileName"
      class="h-full w-full object-contain rounded-2xl"
    />
  </div>
</template>
