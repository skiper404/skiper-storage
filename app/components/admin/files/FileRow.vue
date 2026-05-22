<script setup lang="ts">
import { toast } from 'vue-sonner'

const { t } = useI18n()
const localePath = useLocalePath()
const props = defineProps<{ file: AdminFile }>()
const { executeFiles } = useAdminFetchData()
const { unblockFile, blockFile, deleteFile } = useAdminFileApi()
const { activeAction, setAction, selectedReason, close, title, description, isConfirmDisabled } = useAdminFileActions()

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}`)

const handleClick = async () => {
  if (activeAction.value === 'unblock') {
    unblockFile(props.file.id)
    toast.success(`Файл ${props.file.fileName} разблокирован.`)
  }

  if (activeAction.value === 'block') {
    blockFile(props.file.id, selectedReason.value)
    toast.success(`Файл ${props.file.fileName} заблокирован.`)
  }

  if (activeAction.value === 'delete') {
    deleteFile(props.file.id, selectedReason.value)
    toast.success(`Файл ${props.file.fileName} удален.`)
  }

  await executeFiles()
  close()
}
</script>

<template>
  <div class="hover:bg-muted/30 flex items-center gap-2 px-2 py-4 transition-colors">
    <NuxtLink :to="localePath(`/${file.category}/${file.id}`)" class="flex w-full items-center gap-2">
      <FilePreview :file="file" :url="data?.url" size="sm" />

      <div class="flex max-w-50 min-w-0 flex-1 flex-col sm:max-w-lg">
        <FileName :filename="file.fileName" />
        <FileUserInfo :file="file" />

        <div class="mt-1 flex items-center gap-2 sm:hidden">
          <FileCategory :category="file.category" />
          <FileSize :size="file.size" />
          <FileStatus v-if="file.isBlocked" />
        </div>
      </div>

      <div class="ml-auto flex">
        <FileStatus class="hidden sm:block" v-if="file.isBlocked" />
        <FileCategory class="mx-2 ml-auto hidden sm:block" :category="file.category" />
        <FileSize class="text-muted-foreground hidden w-16 text-center text-xs sm:block" :size="file.size" />
      </div>
    </NuxtLink>

    <Dialog :open="!!activeAction" @update:open="close">
      <FileDropdownMenu :file="file" @set-action="setAction" />

      <DialogContent class="bg-primary-foreground/20 border-white/10 backdrop-blur-2xl">
        <DialogHeader class="space-y-3">
          <DialogTitle class="text-center text-xl">
            {{ title }}
          </DialogTitle>

          <DialogDescription class="text-center text-sm leading-relaxed text-gray-400">
            {{ description }}

            <span class="font-semibold break-all text-white">{{ file.fileName }}</span>
            ?
          </DialogDescription>

          <ReasonSelect v-model="selectedReason" v-if="activeAction !== 'unblock'" />
        </DialogHeader>

        <div class="flex items-center justify-center gap-3 pt-2">
          <DialogClose as-child>
            <Button variant="outline" class="rounded-xl border-white/90 text-zinc-100 hover:bg-white/5">
              {{ t('ui.dialog.no') }}
            </Button>
          </DialogClose>

          <Button variant="destructive" class="rounded-xl" :disabled="isConfirmDisabled" @click="handleClick">
            {{ t('ui.dialog.yes') }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
