<script setup lang="ts">
import type { File } from '~~/shared/types/file'

const { file } = defineProps<{ file: File }>()
const localePath = useLocalePath()
</script>

<template>
  <div class="relative">
    <NuxtLink
      v-if="file.id && file.category"
      :to="localePath(`/${file.category}/${file.id}`)"
      :class="[
        'mx-auto flex flex-col items-center gap-2',
        { 'pointer-events-none blur-xs select-none': file.isBlocked }
      ]"
    >
      <FilePreview :file="file" size="md" />
      <span class="w-28 truncate text-center text-xs text-gray-400" :title="file.fileName">
        {{ file.fileName }}
      </span>
    </NuxtLink>
    <FileBlocked v-if="file.isBlocked" class="-translate-y-2/3" />
  </div>
</template>
