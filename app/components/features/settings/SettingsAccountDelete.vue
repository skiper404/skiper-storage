<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const { clear } = useUserSession()

const isDeleting = ref(false)
const open = ref(false)

const deleteAccount = async () => {
  isDeleting.value = true

  try {
    await $fetch('/api/user/delete-user', {
      method: 'DELETE'
    })

    toast.success(t('notifications.user.deleted'))
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
        {{ t('features.settings.danger.title') }}
      </CardTitle>

      <CardDescription> {{ t('features.settings.danger.description') }} </CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <Button variant="destructive" class="w-full" @click="open = true">
        <Icon name="lucide:trash-2" size="16" />
        {{ t('features.settings.danger.delete') }}
      </Button>

      <p class="text-muted-foreground text-xs">{{ t('features.settings.danger.warning') }}</p>
    </CardContent>
  </Card>

  <Dialog v-model:open="open">
    <DialogContent class="space-y-4">
      <DialogHeader>
        <DialogTitle>{{ t('features.settings.danger.dialog.title') }}</DialogTitle>
        <DialogDescription>
          {{ isDeleting ? '...' : t('features.settings.danger.dialog.description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="flex items-center justify-end gap-2">
        <Button variant="outline" @click="open = false" :disabled="isDeleting"> Cancel </Button>

        <Button variant="destructive" @click="deleteAccount" :disabled="isDeleting">
          <Icon name="lucide:trash-2" size="16" />
          {{
            isDeleting ? t('features.settings.danger.actions.deleting') : t('features.settings.danger.actions.delete')
          }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
