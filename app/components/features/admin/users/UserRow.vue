<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{ user: AdminUser }>()
const { t } = useI18n()
const { executeUsers } = useAdminFetchData()
const { unblockUser, blockUser, deleteUser } = useAdminUserApi()
const { activeAction, selectedReason, close, setAction, title, description, isConfirmDisabled } =
  useAdminActions('user')

const handleClick = async () => {
  const username = props.user.username

  if (activeAction.value === 'unblock') {
    unblockUser(props.user.id)
    toast.success(t('notifications.user.unblocked', { name: username }))
  }

  if (activeAction.value === 'block') {
    blockUser(props.user.id, selectedReason.value)
    toast.success(t('notifications.user.blocked', { name: username }))
  }

  if (activeAction.value === 'delete') {
    deleteUser(props.user.id, selectedReason.value)
    toast.success(t('notifications.user.deleted', { name: username }))
  }
  close()
  setTimeout(async () => await executeUsers(), 100)
}
</script>

<template>
  <div class="hover:bg-muted/40 flex items-center gap-2 py-2">
    <UserInfo :user="user" />

    <div class="ml-auto flex gap-1">
      <UserStatus v-if="user.isBlocked" class="hidden sm:block" />
      <UserRole :role="user.role" />
      <UserPlan :plan="user.plan" />
      <UserCountFiles :count="user._count.files" />
    </div>

    <Dialog :open="!!activeAction" @update:open="close">
      <UserDropdownMenu :user="user" @set-action="setAction" />

      <DialogContent class="bg-secondary/20 border-white/10 backdrop-blur-2xl">
        <DialogHeader class="space-y-3">
          <DialogTitle class="text-center text-xl">
            {{ title }}
          </DialogTitle>

          <DialogDescription class="text-center text-sm leading-relaxed text-gray-400">
            {{ description }}

            <span class="font-semibold break-all text-white">{{ user.username }}</span>
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
