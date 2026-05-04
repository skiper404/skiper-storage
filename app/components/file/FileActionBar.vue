<script setup lang="ts">
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'

import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

const { file } = defineProps<{ file: UploadedFile }>()
const { t } = useI18n()
const { execute } = useFetchedFiles()

const downloadFile = () => {
  window.open(`/api/files/download/${file.id}`, '_blank')
}

const deleteFile = async () => {
  await $fetch(`/api/files/${file.id}`, { method: 'DELETE' })
  await execute()
  toast.success(`Файл ${file.originalName} удален.`)
  return navigateTo('/')
}
</script>

<template>
  <div class="mt-auto flex gap-2 items-center justify-center">
    <Badge
      :class="[
        'text-gray-100',
        {
          'bg-violet-500': file.category === 'image',
          'bg-indigo-500': file.category === 'audio',
          'bg-sky-500': file.category === 'video'
        }
      ]"
    >
      {{ file.mimeType }}
    </Badge>

    |

    <Button size="sm" class="rounded-2xl" @click="downloadFile">
      <span class="hidden sm:inline">{{ t('ui.download') }}</span>
      <Icon name="lucide:download" />
    </Button>

    <Dialog>
      <DialogTrigger as-child>
        <Button size="sm" class="rounded-2xl" variant="destructive">
          <span class="hidden sm:inline">{{ t('ui.delete') }}</span>
          <Icon name="lucide:trash-2" />
        </Button>
      </DialogTrigger>

      <DialogContent class="space-y-4 bg-primary-foreground">
        <DialogHeader class="space-y-2">
          <DialogTitle>
            {{ t('ui.deleteForm.title') }}
          </DialogTitle>

          <DialogDescription class="text-center">
            {{ t('ui.deleteForm.description') }}

            {{ file.originalName }}

            ?
          </DialogDescription>
        </DialogHeader>

        <div class="flex items-center justify-center gap-4">
          <DialogClose as-child>
            <Button variant="outline">
              {{ t('ui.deleteForm.no') }}
            </Button>
          </DialogClose>

          <Button variant="destructive" @click="deleteFile">
            {{ t('ui.deleteForm.yes') }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    |

    <Badge variant="secondary">
      {{ filesize(file.size) }}
    </Badge>
  </div>
</template>
