<script setup lang="ts">
import { type AdminUser } from '~~/shared/types/admin-user'

const props = defineProps<{
  users: AdminUser[]
}>()

const stats = computed(() => {
  const list = props.users ?? []

  const totalUsers = list.length
  const totalFiles = list.reduce((acc, u) => acc + (u._count?.files ?? 0), 0)

  const filesPerUser = totalUsers ? totalFiles / totalUsers : 0

  return {
    totalUsers,
    totalFiles,
    filesPerUser: filesPerUser.toFixed(1)
  }
})

const topUsers = computed(() => props.users.sort((a, b) => b._count.files - a._count.files).slice(0, 10))
</script>

<template>
  <TabsContent value="dashboard" class="mt-6 space-y-6">
    <div class="grid gap-4 md:grid-cols-3">
      <Card class="bg-muted/30">
        <CardHeader>
          <CardTitle class="text-sm">Users</CardTitle>
        </CardHeader>
        <CardContent class="text-3xl font-bold">
          {{ stats.totalUsers }}
        </CardContent>
      </Card>

      <Card class="bg-muted/30">
        <CardHeader>
          <CardTitle class="text-sm">Files</CardTitle>
        </CardHeader>
        <CardContent class="text-3xl font-bold">
          {{ stats.totalFiles }}
        </CardContent>
      </Card>

      <Card class="bg-muted/30">
        <CardHeader>
          <CardTitle class="text-sm">Avg files/user</CardTitle>
        </CardHeader>
        <CardContent class="text-3xl font-bold">
          {{ stats.filesPerUser }}
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Top {{ topUsers.length }} users</CardTitle>
      </CardHeader>

      <CardContent>
        <div class="space-y-3">
          <div v-for="user in topUsers" :key="user.id" class="flex items-center justify-between rounded-lg border p-3">
            <div class="flex items-center gap-3">
              <Avatar v-if="user">
                <AvatarImage :src="user?.image || ''" />
                <AvatarFallback class="bg-indigo-500 capitalize">
                  {{ user.email?.slice(0, 2).toUpperCase() }}
                </AvatarFallback>
              </Avatar>

              <div>
                <p class="font-medium">{{ user.username }}</p>
                <p class="text-muted-foreground text-xs">
                  {{ user.email }}
                </p>
              </div>
            </div>

            <Badge :variant="user.role === 'ADMIN' ? 'destructive' : 'outline'" class="ml-auto">
              {{ user.role }}
            </Badge>

            <Badge class="ml-2"> {{ user._count.files }} files </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
</template>
