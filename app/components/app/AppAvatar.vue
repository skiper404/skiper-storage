<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Avatar v-if="user">
        <AvatarImage v-if="user.image" :src="user.image" />
        <AvatarFallback v-else class="bg-indigo-500 capitalize">
          {{ (user.email ?? user.name)?.[0] }}
        </AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ user?.name ?? user?.email }}</p>
    </TooltipContent>
  </Tooltip>
</template>
