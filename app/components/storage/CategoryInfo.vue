<script setup lang="ts">
import { filesize } from 'filesize'

import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { category, files } = defineProps<{
  category: string
  files: UploadedFile[]
}>()

const { t } = useI18n()

const categoryLabel = computed(() => t(`ui.info.categories.${category}`))

const { categoryStats } = useFilesStats(files)

const stats = computed(() => categoryStats(category))

const icon = computed(() => {
  if (category === 'audio') return 'lucide:file-audio'
  if (category === 'video') return 'lucide:file-video'
  if (category === 'image') return 'lucide:file-image'
  return 'lucide:file-question-mark'
})
</script>

<template>
  <div
    v-if="stats.count"
    :class="[
      'rounded-2xl flex w-full gap-2 px-1 text-xs p-1 justify-center items-center text-gray-200',
      {
        'bg-blue-500/70': category === 'audio',
        'bg-violet-500/70': category === 'video',
        'bg-indigo-500/70': category === 'image'
      }
    ]"
  >
    <Icon
      :name="icon"
      size="20"
      :class="[
        {
          'text-indigo-500': category === 'image',
          'text-blue-500': category === 'audio',
          'text-violet-500': category === 'video'
        }
      ]"
    />
    <span class="hidden sm:inline capitalize" variant="outline">
      {{ categoryLabel }} :
    </span>

    <span class="font-bold">{{ stats.count }}</span>
    <span class="hidden sm:inline">|</span>
    <span class="hidden sm:inline">
      {{ filesize(stats.size) }}
    </span>
  </div>
</template>
