<script setup lang="ts">
import { filesize } from 'filesize'

const { category } = defineProps<{
  category: string
}>()

const { t } = useI18n()
const { getFileSizeByCategory, getFilesByCategory } = useStorage()

const files = computed(() => getFilesByCategory(category))
const fileSize = computed(() => getFileSizeByCategory(category))
const categoryLabel = computed(() => t(`ui.info.categories.${category}`))

const icon = computed(() => {
  if (category === 'audio') return 'lucide:file-audio'
  if (category === 'video') return 'lucide:file-video'
  if (category === 'image') return 'lucide:file-image'
  return 'lucide:file-question-mark'
})
</script>

<template>
  <div
    :class="[
      'rounded-lg flex w-full gap-2 px-1 text-xs p-1 justify-center items-center text-gray-200',
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
    <span class="font-bold">{{ files.length }}</span>
    <span class="hidden sm:inline">|</span>
    <span class="hidden sm:inline">
      {{ filesize(fileSize) }}
    </span>
  </div>
</template>
