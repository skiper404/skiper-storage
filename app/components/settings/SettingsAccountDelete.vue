<script setup lang="ts">
import { ref } from 'vue'

const { clear } = useUserSession()
const { t } = useI18n()

const isDeleting = ref(false)
const open = ref(false)

const deleteAccount = async () => {
  isDeleting.value = true

  try {
    await $fetch('/api/user/delete-user', {
      method: 'DELETE'
    })

    await clear()
    await navigateTo('/auth/login-user')
  } finally {
    isDeleting.value = false
    open.value = false
  }
}
</script>

<template>
  <Card class="border-red-500/20">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-red-500">
        <Icon name="lucide:triangle-alert" size="18" />
        Danger zone
      </CardTitle>

      <CardDescription> Once you delete your account, all data will be permanently removed. </CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <!-- TRIGGER -->
      <Button variant="destructive" class="w-full" @click="open = true">
        <Icon name="lucide:trash-2" size="16" />
        Delete account
      </Button>

      <p class="text-muted-foreground text-xs">This action is irreversible and cannot be undone.</p>
    </CardContent>
  </Card>

  <Dialog v-model:open="open">
    <DialogContent class="space-y-4">
      <DialogHeader>
        <DialogTitle>Delete account</DialogTitle>
        <DialogDescription>
          This action cannot be undone. All your data will be permanently removed.
        </DialogDescription>
      </DialogHeader>

      <div class="flex items-center justify-end gap-2">
        <Button variant="outline" @click="open = false" :disabled="isDeleting"> Cancel </Button>

        <Button variant="destructive" @click="deleteAccount" :disabled="isDeleting">
          <Icon name="lucide:trash-2" size="16" />
          {{ isDeleting ? 'Deleting...' : 'Yes, delete' }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
