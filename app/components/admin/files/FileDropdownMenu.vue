<script setup lang="ts">
const props = defineProps<{ file: AdminFile }>()

const emit = defineEmits<{
  setAction: [action: Action]
}>()

const isAdmin = computed(() => props.file.user.role === 'ADMIN')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="lucide:more-horizontal" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem :disabled="isAdmin || !props.file.isBlocked" @click="emit('setAction', 'unblock')">
        <Icon name="lucide:circle" />
        Unblock file
      </DropdownMenuItem>
      <DropdownMenuItem :disabled="isAdmin || props.file.isBlocked" @click="emit('setAction', 'block')">
        <Icon name="lucide:ban" />
        Block file
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" :disabled="isAdmin" @click="emit('setAction', 'delete')">
        <Icon name="lucide:trash-2" />
        Delete file
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
