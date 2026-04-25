<script setup lang="ts">
import { toast } from 'vue-sonner'

import { ALLOWED_FORMATS } from '~/constants'

const props = defineProps<{ remainingSize: number }>()
const emit = defineEmits(['success'])
const { t } = useI18n()

const { inputRef, selectedFiles, onSelectedFile, removeSelectedFile } =
  useFilePicker()

const { isUploading, startUpload } = useFileUpload(
  selectedFiles,
  toRef(props, 'remainingSize')
)

const isDialogOpen = ref(false)

const handleSelectFiles = () => {
  inputRef.value?.click()
}

const startUploading = async () => {
  try {
    await startUpload()
    emit('success')

    selectedFiles.value = []
    isDialogOpen.value = false

    toast.success('Files successfully uploads.')
  } catch (e: any) {
    toast.error('Not enough storage space')
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger>
      <Button
        class="fixed bottom-10 left-1/2 z-10 w-60 -translate-x-1/2 bg-lime-500/80 text-indigo-100 shadow-lg backdrop-blur-2xl hover:bg-indigo-300"
        :disabled="selectedFiles.length > 10"
        @click="handleSelectFiles"
        size="sm"
      >
        <Icon name="lucide:cloud-upload" size="20" />
        <span>
          {{ t('ui.upload.uploadButton') }}
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent
      class="bg-primary-foreground space-y-4 transition-all duration-300"
    >
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          {{ t('ui.upload.title') }}
          <Icon
            v-if="isUploading"
            name="lucide:loader-circle"
            size="20"
            class="animate-spin"
          />
        </DialogTitle>
        <DialogDescription class="mt-4 space-y-2 space-x-2 text-left">
          {{ t('ui.upload.description.quantity') }}
          <br />
          {{ t('ui.upload.description.formats') }}
          <br />
          <Badge
            variant="secondary"
            class="text-gray-400"
            v-for="(format, id) in ALLOWED_FORMATS"
            :key="id"
          >
            {{ format }}
          </Badge>
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-wrap justify-center gap-3">
        <div
          v-for="(file, id) in selectedFiles"
          class="pointer-events-none relative flex flex-col items-center gap-2 select-none"
        >
          <div
            v-if="file.file.type.includes('audio')"
            class="flex size-18 items-center justify-center rounded-2xl border bg-gray-200 text-indigo-500 dark:bg-gray-800"
          >
            <Icon name="lucide:file-music" size="50" />
          </div>

          <img
            v-else
            :src="file.preview"
            alt="alt"
            class="size-18 rounded-2xl object-cover"
          />
          <span class="text-primary mt-auto w-18 truncate text-center text-xs">
            {{ file.file.name }}
          </span>
          <Progress :model-value="file.progress" />
          <span class="absolute top-6 left-6 flex rounded-full bg-black/50">
            <Icon
              v-if="file.uploaded"
              name="lucide:circle-check"
              size="24"
              class="text-green-500"
            />
          </span>

          <Button
            size="icon-sm"
            v-if="!isUploading"
            class="pointer-events-auto absolute -top-2 -right-2 z-10 size-fit cursor-pointer rounded-2xl bg-black text-gray-400 transition-colors hover:bg-black hover:text-red-300"
            @click="removeSelectedFile(id)"
          >
            <Icon name="lucide:circle-x" size="24" />
          </Button>
        </div>
      </div>
      <div class="flex w-full items-center justify-center gap-8">
        <Button
          variant="secondary"
          :disabled="selectedFiles.length >= 10 || isUploading"
          @click="handleSelectFiles"
        >
          <Icon size="20" name="lucide:plus" />
          {{ t('ui.upload.addButton') }}
        </Button>
        <Button
          :disabled="selectedFiles.length === 0 || isUploading"
          variant="default"
          @click="startUploading"
        >
          <Icon name="lucide:cloud-upload" size="20" />
          {{ t('ui.upload.uploadButton') }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>

  <input
    ref="inputRef"
    class="hidden"
    type="file"
    multiple
    accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,audio/mpeg"
    @change="onSelectedFile"
  />
</template>
