<script setup lang="ts">
import { toast } from 'vue-sonner'

const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{ file: AdminFile }>()

const { executeFiles } = useAdminFetchData()
const { unblockFile, blockFile, deleteFile } = useAdminFileApi()

const { activeAction, setAction, selectedReason, close, title, description, isConfirmDisabled } =
  useAdminActions('file')

const { data } = await useFetch<{ url: string }>(`/api/files/${props.file.id}`)

const localFile = ref({ ...props.file })

const applyOptimisticUpdate = () => {
  if (activeAction.value === 'block') {
    localFile.value.isBlocked = true
  }

  if (activeAction.value === 'unblock') {
    localFile.value.isBlocked = false
  }

  if (activeAction.value === 'delete') {
    ;(localFile.value as any).isDeleted = true
  }
}

const handleClick = async () => {
  const file = localFile.value
  const fileName = file.fileName
  const id = file.id

  const prevState = { ...file }

  applyOptimisticUpdate()
  close()

  try {
    if (activeAction.value === 'unblock') {
      unblockFile(id)
      toast.success(t('notifications.file.unblocked', { name: fileName }))
    }

    if (activeAction.value === 'block') {
      blockFile(id, selectedReason.value)
      toast.success(t('notifications.file.blocked', { name: fileName }))
    }

    if (activeAction.value === 'delete') {
      deleteFile(id, selectedReason.value)
      toast.success(t('notifications.file.deleted', { name: fileName }))
    }

    executeFiles()
  } catch (err) {
    localFile.value = prevState
    toast.error(t('notifications.error') || 'Something went wrong')
  }
}
</script>

<template>
  <div class="hover:bg-muted/30 flex items-center gap-2 px-2 py-4 transition-colors">
    <NuxtLink :to="localePath(`/${localFile.category}/${localFile.id}`)" class="flex w-full items-center gap-2">
      <FilePreview :file="localFile" :url="data?.url" size="sm" />

      <div class="flex max-w-50 min-w-0 flex-1 flex-col sm:max-w-lg">
        <FileName :filename="localFile.fileName" />
        <FileUserInfo :file="localFile" />

        <div class="mt-1 flex items-center gap-2 sm:hidden">
          <FileCategory :category="localFile.category" />
          <FileSize :size="localFile.size" />
          <FileStatus v-if="localFile.isBlocked" />
        </div>
      </div>

      <div class="ml-auto flex">
        <FileStatus class="hidden sm:block" v-if="localFile.isBlocked" />
        <FileCategory class="mx-2 ml-auto hidden sm:block" :category="localFile.category" />
        <FileSize class="text-muted-foreground hidden w-16 text-center text-xs sm:block" :size="localFile.size" />
      </div>
    </NuxtLink>

    <Dialog :open="!!activeAction" @update:open="close">
      <FileDropdownMenu :file="localFile" @set-action="setAction" />

      <DialogContent class="bg-primary-foreground/20 border-white/10 backdrop-blur-2xl">
        <DialogHeader class="space-y-3">
          <DialogTitle class="text-center text-xl">
            {{ title }}
          </DialogTitle>

          <DialogDescription class="text-center text-sm leading-relaxed text-gray-400">
            {{ description }}
            <span class="font-semibold break-all text-white">
              {{ localFile.fileName }}
            </span>
            ?
          </DialogDescription>

          <ReasonSelect v-model="selectedReason" v-if="activeAction !== 'unblock'" />
        </DialogHeader>

        <div class="flex items-center justify-center gap-3 pt-2">
          <DialogClose as-child>
            <Button variant="outline" class="rounded-xl border-white/90 text-zinc-100 hover:bg-white/5">
              {{ t('ui.buttons.no') }}
            </Button>
          </DialogClose>

          <Button variant="destructive" class="rounded-xl" :disabled="isConfirmDisabled" @click="handleClick">
            {{ t('ui.buttons.yes') }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
