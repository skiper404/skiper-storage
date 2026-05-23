<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{ users: AdminUser[] }>()
</script>

<template>
  <TabsContent value="users" class="mt-6">
    <Card class="border-border border">
      <CardHeader>
        <CardTitle> {{ t('features.admin.users.title') }}</CardTitle>
        <CardDescription> {{ t('features.admin.users.description') }} </CardDescription>
      </CardHeader>

      <CardContent class="sm:px-auto px-0">
        <div class="bg-background border-red flex w-full flex-col border">
          <UserRow v-for="(user, i) in users" :key="user.id" :user="user" :class="{ 'bg-secondary/30': i % 2 }" />
        </div>
      </CardContent>
    </Card>
  </TabsContent>
</template>
