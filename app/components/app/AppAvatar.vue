<script setup lang="ts">
const { user } = useUserSession()
const localePath = useLocalePath()
</script>

<template>
  <Tooltip>
    <NuxtLink :to="localePath('/dashboard/settings')">
      <TooltipTrigger as-child>
        <Avatar v-if="user">
          <AvatarImage v-if="user.image" :src="user.image" />
          <AvatarFallback v-else class="bg-indigo-500 capitalize">
            {{ user.username?.[0] }}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
    </NuxtLink>

    <TooltipContent>
      <p>
        {{ user?.username }}
      </p>
    </TooltipContent>
  </Tooltip>
</template>
