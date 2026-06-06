<script setup lang="ts">
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'

import { ALLOWED_FORMATS } from '~~/shared/constants'

const { t } = useI18n()
const { execute } = useFetchedFiles()
const localePath = useLocalePath()
const { remainingStorageSize } = useStorage()
const { isUploading, selectedFiles, selectedFilesSize, clearSelectedFiles, removeFile, addFiles, upload } = useUpload()

const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const handleAddFilesButton = () => {
  inputRef.value?.click()
}

const isEnougthFreeSpace = computed(() => selectedFilesSize.value < remainingStorageSize.value)

const onChangeInput = () => {
  const files = inputRef.value?.files
  if (!files?.length) return
  addFiles(files)
}

const startUpload = async () => {
  if (!isEnougthFreeSpace.value) return
  try {
    await upload()
    await execute()
    await navigateTo(localePath('/dashboard'))
  } catch (e: any) {
    toast.error(e.message)
  } finally {
    isOpen.value = false
    clearSelectedFiles()
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="bg-lime-500/80 text-indigo-100 shadow-lg backdrop-blur-2xl hover:bg-indigo-300" size="sm">
        <Icon name="lucide:cloud-upload" size="20" />
        <span>
          {{ t('ui.buttons.upload') }}
        </span>
      </Button>
    </DialogTrigger>

    <DialogContent
      class="bg-primary-foreground flex max-h-[80vh] flex-col space-y-4 overflow-auto rounded-2xl transition-all duration-300"
    >
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          {{ t('dialogs.upload.title') }}
          <Icon v-if="isUploading" name="lucide:loader-circle" size="20" class="animate-spin" />
        </DialogTitle>

        <DialogDescription class="flex flex-col gap-2 space-y-2 space-x-2 text-left md:flex-row md:justify-between">
          <span class="landscape:hidden">
            {{ t('dialogs.upload.remainingSpace') }}:
            {{ filesize(remainingStorageSize) }}
          </span>

          <span class="landscape:hidden">
            {{ t('dialogs.upload.selectedFiles') }}:
            {{ filesize(selectedFilesSize) }}
          </span>

          <span class="landscape:hidden">{{ t('dialogs.upload.allowedFormats') }}: </span>
          <div class="flex flex-wrap gap-2 landscape:hidden">
            <Badge variant="secondary" class="text-gray-400" v-for="(format, id) in ALLOWED_FORMATS" :key="id">
              {{ format }}
            </Badge>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div class="flex max-h-100 flex-wrap justify-center gap-3 overflow-y-auto p-2">
        <div
          v-for="(file, id) in selectedFiles"
          :key="id"
          class="pointer-events-none relative flex flex-col items-center gap-2 select-none"
        >
          <div
            v-if="isMatchType(file, FileType.AUDIO)"
            class="flex size-18 items-center justify-center rounded-2xl border bg-gray-200 text-indigo-500 dark:bg-gray-800"
          >
            <Icon name="lucide:file-music" size="50" />
          </div>

          <NuxtImg
            v-if="isMatchType(file, FileType.IMAGE)"
            :src="file.preview"
            class="size-18 rounded-2xl object-cover"
          />

          <video
            v-if="isMatchType(file, FileType.VIDEO)"
            :src="file.preview"
            class="size-18 rounded-2xl object-cover"
            muted
            preload="metadata"
          />

          <span class="text-primary mt-auto w-18 truncate text-center text-xs">
            {{ file.name }}
          </span>
          <span class="text-primary mt-auto w-18 truncate text-center text-xs">{{ filesize(file.size) }}</span>
          <Progress :model-value="file.progress" />
          <span class="absolute top-6 left-6 flex rounded-full bg-black/50">
            <Icon v-if="file.progress === 100" name="lucide:circle-check" size="24" class="text-green-500" />
          </span>

          <Button
            size="icon-sm"
            v-if="!isUploading"
            class="pointer-events-auto absolute -top-2 -right-2 z-10 size-fit cursor-pointer rounded-2xl bg-black text-gray-400 transition-colors hover:bg-black hover:text-red-300"
            @click="removeFile(file)"
          >
            <Icon name="lucide:circle-x" size="24" />
          </Button>
        </div>
      </div>
      <div class="flex w-full items-center justify-center gap-8">
        <Button variant="secondary" @click="handleAddFilesButton">
          <Icon size="20" name="lucide:plus" />
          {{ t('ui.buttons.addFiles') }}
        </Button>
        <Button
          variant="default"
          @click="startUpload"
          :disabled="selectedFiles.length === 0 || isUploading || !isEnougthFreeSpace"
        >
          <Icon name="lucide:cloud-upload" size="20" />
          {{ t('ui.buttons.upload') }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>

  <input
    ref="inputRef"
    class="hidden"
    type="file"
    multiple
    :accept="ALLOWED_FORMATS.join(', ')"
    @change="onChangeInput"
  />
</template>
