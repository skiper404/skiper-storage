<script setup lang="ts">
const props = defineProps<{ user: AdminUser }>()
</script>

<template>
  <div>
    <div class="mx-2 flex items-center gap-2">
      <Avatar v-if="user">
        <AvatarImage :src="user?.image || ''" />
        <AvatarFallback class="bg-indigo-500 text-zinc-200 capitalize">
          {{ user.email?.slice(0, 2).toUpperCase() }}
        </AvatarFallback>
      </Avatar>

      <div class="flex flex-col">
        <span class="font-medium">{{ user.username }}</span>
        <span class="text-xs text-zinc-500">
          {{ user.email }}
        </span>
      </div>
    </div>
  </div>
</template>
