<script setup lang="ts">
const { data } = useAuth()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Avatar v-if="data?.user">
        <AvatarImage v-if="data.user.image" :src="data.user.image" />
        <AvatarFallback v-else class="bg-indigo-500 capitalize">
          {{ (data.user.email ?? data.user.name)?.[0] }}
        </AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ data?.user?.name ?? data?.user?.email }}</p>
    </TooltipContent>
  </Tooltip>
</template>
