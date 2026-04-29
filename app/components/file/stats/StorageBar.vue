<script setup lang="ts">
import { filesize } from 'filesize'

import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

import { STORAGE_LIMIT } from '~/constants'

const props = defineProps<{ files: UploadedFile[] }>()

const { totalSize, usedPercentage } = useStorage(toRef(props, 'files'))
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-xs text-gray-400 dark:text-gray-400">Storage:</span>
    <div class="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        :class="[
          'h-2 rounded-full',
          {
            'bg-green-500': usedPercentage < 80,
            'bg-yellow-500': usedPercentage >= 80 && usedPercentage < 90,
            'bg-red-500': usedPercentage >= 90 && usedPercentage < 100
          }
        ]"
        :style="{
          width: `${usedPercentage}%`
        }"
      ></div>
    </div>
    <div class="text-[10px] text-gray-400 sm:text-xs">
      {{ filesize(totalSize) }} / {{ filesize(STORAGE_LIMIT) }}
    </div>
  </div>
</template>
