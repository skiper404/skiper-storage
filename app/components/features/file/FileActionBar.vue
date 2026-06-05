<script setup lang="ts">
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'

import type { File } from '~~/shared/types/file'

const { file } = defineProps<{ file: File }>()
const { t } = useI18n()
const { execute } = useFetchedFiles()

const deleteFile = async () => {
  try {
    await $fetch(`/api/files/${file.id}` as string, { method: 'DELETE' })
    await execute()
    toast.success(
      t('notifications.file.deleted', {
        name: file.fileName
      })
    )
    return navigateTo('/dashboard')
  } catch (e: any) {
    toast.error(e.message)
  }
}
</script>

<template>
  <div
    class="mt-auto flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur-xl"
  >
    <div class="flex items-center gap-2">
      <Badge
        class="rounded-full px-3 py-1 text-xs font-medium text-white"
        :class="{
          'bg-violet-500/90': file.category === 'image',
          'bg-sky-500/90': file.category === 'video',
          'bg-indigo-500/90': file.category === 'audio'
        }"
      >
        <Icon v-if="file.category === 'image'" name="lucide:image" size="14" />
        <Icon v-if="file.category === 'video'" name="lucide:video" size="14" />
        <Icon v-if="file.category === 'audio'" name="lucide:music" size="14" />

        <span class="capitalize">
          {{ t(`${file.category}`) }}
        </span>
      </Badge>

      <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
        {{ filesize(file.size) }}
      </Badge>
    </div>

    <div class="flex items-center gap-2">
      <Button
        as-child
        size="icon-sm"
        variant="secondary"
        class="rounded-full border border-white/10 bg-white/5 text-gray-200 transition-all hover:scale-105 hover:bg-white/10"
      >
        <a :href="`/api/files/download/${file.id}`">
          <Icon name="lucide:download" size="16" />
        </a>
      </Button>

      <Dialog>
        <DialogTrigger as-child>
          <Button size="icon-sm" variant="destructive" class="rounded-full transition-all hover:scale-105">
            <Icon name="lucide:trash-2" size="16" />
          </Button>
        </DialogTrigger>

        <DialogContent class="bg-primary-foreground/20 border-white/10 backdrop-blur-2xl">
          <DialogHeader class="space-y-3">
            <DialogTitle class="text-center text-xl">
              {{ t('features.files.deleteForm.title') }}
            </DialogTitle>

            <DialogDescription class="text-center text-sm leading-relaxed text-gray-400">
              {{ t('features.files.deleteForm.description') }}

              <span class="font-semibold break-all text-white">
                {{ file.fileName }}
              </span>

              ?
            </DialogDescription>
          </DialogHeader>

          <div class="flex items-center justify-center gap-3 pt-2">
            <DialogClose as-child>
              <Button variant="outline" class="rounded-xl border-white/10 text-zinc-100 hover:bg-white/5">
                {{ t('ui.buttons.no') }}
              </Button>
            </DialogClose>

            <Button variant="destructive" class="rounded-xl" @click="deleteFile">
              {{ t('ui.buttons.yes') }}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
