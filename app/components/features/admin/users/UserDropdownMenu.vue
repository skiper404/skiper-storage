<script setup lang="ts">
import type { Action } from '~~/shared/types/admin-actions'

const { t } = useI18n()
const props = defineProps<{ user: AdminUser }>()

const emit = defineEmits<{
  setAction: [action: Action]
}>()

const isAdmin = computed(() => props.user.role === 'ADMIN')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon-sm">
        <Icon name="lucide:more-horizontal" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem :disabled="isAdmin || !user.isBlocked" @click="emit('setAction', 'unblock')">
        <Icon name="lucide:circle" />
        {{ t('domain.user.actions.unblock') }}
      </DropdownMenuItem>
      <DropdownMenuItem :disabled="isAdmin || user.isBlocked" @click="emit('setAction', 'block')">
        <Icon name="lucide:ban" />
        {{ t('domain.user.actions.block') }}
      </DropdownMenuItem>

      <DropdownMenuItem variant="destructive" :disabled="isAdmin" @click="emit('setAction', 'delete')">
        <Icon name="lucide:trash-2" />
        {{ t('domain.user.actions.delete') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
