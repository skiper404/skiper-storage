<script setup lang="ts">
import { filesize } from 'filesize'

import { STORAGE_PLANS } from '~~/shared/constants'
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const props = defineProps<{ files: UploadedFile[] }>()

const { totalSize, usedPercentage } = useStorage(toRef(props, 'files'))

const { user } = useUserSession()
const storagePlan = computed(() => user.value?.plan || 'FREE')
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
      {{ filesize(totalSize) }} / {{ filesize(STORAGE_PLANS[storagePlan]) }}
    </div>
  </div>
</template>
