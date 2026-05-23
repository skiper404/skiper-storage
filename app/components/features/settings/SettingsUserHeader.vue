<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <Card class="border-border/50 overflow-hidden">
    <div class="h-10 bg-linear-to-r from-violet-300 via-indigo-700 to-blue-300 dark:from-violet-700 dark:to-blue-900" />

    <CardContent class="relative px-6 pb-6">
      <Avatar v-if="user" class=" absolute -top-14 size-28 border-2 shadow-xl">
        <AvatarImage :src="user.image || ''" />
        <AvatarFallback class="bg-indigo-500 capitalize">
          {{ user.username?.[0] }}
        </AvatarFallback>
      </Avatar>

      <div class="flex flex-col gap-6 pt-20 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-semibold">
              {{ user?.username }}
            </h2>

            <Badge variant="secondary">
              {{ user?.plan }}
            </Badge>
          </div>

          <p class="text-muted-foreground mt-2 text-sm">
            {{ user?.email }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
