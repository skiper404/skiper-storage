<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { updateProfileSchema } from '~~/shared/schemas/update-profile-schema'

const { user, fetch } = useUserSession()
const { t } = useI18n()

const { handleSubmit, setErrors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    username: '',
    email: ''
  }
})

const onSubmit = handleSubmit(async values => {
  try {
    await $fetch('/api/user/update-profile', {
      method: 'POST',
      body: values
    })

    resetForm({ values })
  } catch (e: any) {
    const message = e?.data?.message

    if (message === 'emailAlreadyInUse') {
      setErrors({ email: 'emailAlreadyInUse' })
      return
    }

    setErrors({
      username: 'serverError',
      email: 'serverError'
    })
  }
  await fetch()

  toast.success(t('notifications.user.updated'))
})
</script>

<template>
  <Card>
    <CardHeader class="space-y-1">
      <CardTitle class="flex items-center gap-2">
        <Icon name="lucide:user-cog" size="18" />
        {{ t('features.settings.account.title') }}
      </CardTitle>

      <CardDescription>
        {{ t('features.settings.account.description') }}
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-1 rounded-lg border p-3">
          <p class="text-muted-foreground text-xs tracking-wide uppercase">
            {{ t('features.settings.account.userId') }}
          </p>

          <p class="font-mono text-sm break-all">
            {{ user?.id }}
          </p>
        </div>

        <div class="space-y-1 rounded-lg border p-3">
          <p class="text-muted-foreground text-xs tracking-wide uppercase">
            {{ t('features.settings.account.role') }}
          </p>

          <Badge variant="outline" class="w-fit">
            {{ user?.role }}
          </Badge>
        </div>
      </div>

      <Separator />

      <form class="space-y-5" @submit.prevent="onSubmit">
        <VeeField v-slot="{ field, errors }" name="username">
          <Field class="space-y-2">
            <FieldLabel>Username</FieldLabel>

            <Input v-bind="field" class="h-10" :aria-invalid="!!errors.length" :placeholder="user?.username || ''" />

            <FieldError v-if="errors.length" :errors="errors.map(e => t(`features.auth.errors.${e}`))" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="email">
          <Field class="space-y-2">
            <FieldLabel>Email</FieldLabel>

            <Input
              v-bind="field"
              type="email"
              class="h-10"
              :aria-invalid="!!errors.length"
              :placeholder="user?.email || ''"
            />

            <FieldError v-if="errors.length" :errors="errors.map(e => t(`features.auth.errors.${e}`))" />
          </Field>
        </VeeField>

        <Button type="submit" class="h-10 w-full font-medium" :disabled="isSubmitting">
          <Icon name="lucide:save" size="16" />
          {{
            isSubmitting ? t('features.settings.account.actions.saving') : t('features.settings.account.actions.save')
          }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
