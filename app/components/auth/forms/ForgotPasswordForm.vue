<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { forgotPasswordSchema } from '~~/shared/schemas/forgot-password-schema'

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: ''
  }
})

const { t } = useI18n()

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: data
    })
    await navigateTo('/auth/check-email')
  } catch (e: any) {
    setErrors({ email: e.data.message })
  }
})
</script>

<template>
  <Card
    class="bg-secondary mx-auto h-full rounded-none border-none pt-14 sm:mt-20 sm:h-fit sm:w-100 sm:rounded-xl sm:pt-6"
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('auth.forgotPassword.title') }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form id="forgot-password-form" @submit.prevent="onSubmit">
        <VeeField v-slot="{ field, errors }" name="email">
          <Field>
            <FieldLabel for="email">
              {{ t('auth.forgotPassword.emailField') }}
            </FieldLabel>
            <Input
              id="email"
              v-bind="field"
              placeholder="example@mail.com"
              autocomplete="off"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors.map(e => t(`auth.errors.${e}`))" />
          </Field>
        </VeeField>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="forgot-password-form">
          {{ t('auth.forgotPassword.submitButton') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/create-user" class="text-gray-500 hover:underline">
          {{ t('auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
