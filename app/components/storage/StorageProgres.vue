<script setup lang="ts">
import { filesize } from 'filesize'

const {
  storagePlan,
  storagePlanLimit,
  totalFileSizeInBytes,
  totalFileSizeInPercentage,
  remainingStorageSize,
  remainingStorageSizeInPercentage
} = useStorage()

const metrics = [
  { title: 'Used', value: filesize(totalFileSizeInBytes.value) },
  { title: 'Remaining:', value: filesize(remainingStorageSize.value) },
  { title: 'Used %', value: totalFileSizeInPercentage },
  { title: 'Free %', value: remainingStorageSizeInPercentage }
]

const { t } = useI18n()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-sm text-zinc-500 dark:text-zinc-400">
          <span>{{ t('ui.storage.usage') }}</span>
        </span>

        <Badge variant="secondary" class="text-xs capitalize">
          {{ storagePlan }}
        </Badge>
      </div>

      <div class="text-xs text-zinc-500 dark:text-zinc-400">
        {{ filesize(totalFileSizeInBytes) }} / {{ filesize(storagePlanLimit) }}
      </div>
    </div>

    <div class="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="{
          'bg-green-500': totalFileSizeInPercentage < 80,
          'bg-yellow-500': totalFileSizeInPercentage >= 80 && totalFileSizeInPercentage < 90,
          'bg-red-500': totalFileSizeInPercentage >= 90
        }"
        :style="{ width: `${totalFileSizeInPercentage}%` }"
      ></div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
      <div class="flex flex-col" v-for="metric in metrics">
        <span class="text-zinc-400">{{ metric.title }}</span>
        <span class="font-medium">
          {{ metric.value }}
        </span>
      </div>
    </div>
  </div>
</template>
