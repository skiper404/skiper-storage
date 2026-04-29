<script setup lang="ts">
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

import { useInfoBar } from '~/composables/useInfoBar'

const { appName } = useAppConfig()
definePageMeta({ middleware: ['auth'] })
useHead({ title: `Dashboard | ${appName}` })

const { data, refresh } = await useFetch<UploadedFile[]>('/api/files/files')

const files = computed(() => data.value ?? [])
const { isOpen: isInfoBarOpen, toggle: toggleInfoBar } = useInfoBar()

const { remainingSize } = useStorage(files)
</script>

<template>
  <div class="relative mt-12 flex flex-col p-2">
    <Transition name="slide-down">
      <FilesInfoBar
        :files="files ?? []"
        v-if="isInfoBarOpen"
        class="transition-transform"
      />
    </Transition>

    <Button
      size="icon-sm"
      variant="secondary"
      :class="[
        'absolute left-1/2 z-10 -translate-x-1/2 ',
        {
          'top-2': !isInfoBarOpen,
          'top-24': isInfoBarOpen
        }
      ]"
      @click="toggleInfoBar"
    >
      <Icon
        name="lucide:chevron-up"
        :class="['transition duration-300', { 'rotate-180': isInfoBarOpen }]"
      />
    </Button>
    <UploadButton :remainingSize="remainingSize" @success="refresh" />
    <FilesList v-if="files.length" :files="files ?? []" />
    <NoFiles v-else />
  </div>
</template>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
