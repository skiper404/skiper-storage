<script setup lang="ts">
import type { File } from '~~/prisma/generated/client'

const { file } = defineProps<{ file: File }>()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    v-if="file.id && file.category"
    :to="localePath(`/${file.category}/${file.id}`)"
    class="flex flex-col items-center gap-2 mx-auto"
  >
    <FilePreview :file="file" />
    <span
      class="text-xs text-center w-28 truncate text-gray-400"
      :title="file.fileName"
    >
      {{ file.fileName }}
    </span>
  </NuxtLink>
</template>
