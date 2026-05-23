<script setup lang="ts">
const props = defineProps<{ file: AdminFile }>()
</script>

<template>
  <div class="mt-1 flex items-center gap-2">
    <Avatar class="size-8">
      <AvatarImage :src="file.user?.image || ''" />
      <AvatarFallback class="bg-indigo-500 text-zinc-200 capitalize">
        {{ file.user.email?.slice(0, 2).toUpperCase() }}
      </AvatarFallback>
    </Avatar>

    <div>
      <p class="text-muted-foreground/80 text-xs">
        {{ file.user.email }}
      </p>

      <p class="text-muted-foreground/80 text-xs">
        {{ file.user.username }}
      </p>
    </div>
  </div>
</template>
