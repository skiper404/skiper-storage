<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{ user: AdminUser }>()

const { t } = useI18n()
const { executeUsers } = useAdminFetchData()

const { unblockUser, blockUser, deleteUser } = useAdminUserApi()

const { activeAction, selectedReason, close, setAction, title, description, isConfirmDisabled } =
  useAdminActions('user')

const localUser = ref({ ...props.user })

const applyOptimisticUpdate = () => {
  if (activeAction.value === 'block') {
    localUser.value.isBlocked = true
  }

  if (activeAction.value === 'unblock') {
    localUser.value.isBlocked = false
  }

  if (activeAction.value === 'delete') {
    ;(localUser.value as any).isDeleted = true
  }
}

const handleClick = async () => {
  const user = localUser.value
  const username = user.username
  const id = user.id

  const prevState = { ...user }

  applyOptimisticUpdate()
  close()

  try {
    if (activeAction.value === 'unblock') {
      unblockUser(id)
      toast.success(t('notifications.user.unblocked', { name: username }))
    }

    if (activeAction.value === 'block') {
      blockUser(id, selectedReason.value)
      toast.success(t('notifications.user.blocked', { name: username }))
    }

    if (activeAction.value === 'delete') {
      deleteUser(id, selectedReason.value)
      toast.success(t('notifications.user.deleted', { name: username }))
    }

    executeUsers()
  } catch (err) {
    localUser.value = prevState
    toast.error(t('notifications.error') || 'Something went wrong')
  }
}
</script>

<template>
  <div class="hover:bg-muted/40 flex items-center gap-2 py-2">
    <UserInfo :user="localUser" />

    <div class="ml-auto flex gap-1">
      <UserStatus v-if="localUser.isBlocked" class="hidden sm:block" />
      <UserRole :role="localUser.role" />
      <UserPlan :plan="localUser.plan" />
      <UserCountFiles :count="localUser._count.files" />
    </div>

    <Dialog :open="!!activeAction" @update:open="close">
      <UserDropdownMenu :user="localUser" @set-action="setAction" />

      <DialogContent class="bg-secondary/20 border-white/10 backdrop-blur-2xl">
        <DialogHeader class="space-y-3">
          <DialogTitle class="text-center text-xl">
            {{ title }}
          </DialogTitle>

          <DialogDescription class="text-center text-sm leading-relaxed text-gray-400">
            {{ description }}
            <span class="font-semibold break-all text-white">
              {{ localUser.username }}
            </span>
            ?
          </DialogDescription>

          <ReasonSelect v-model="selectedReason" v-if="activeAction !== 'unblock'" />
        </DialogHeader>

        <div class="flex items-center justify-center gap-3 pt-2">
          <DialogClose as-child>
            <Button variant="outline" class="rounded-xl border-white/10 text-zinc-100 hover:bg-white/5" @click="close">
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
