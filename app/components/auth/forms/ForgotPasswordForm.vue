<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { forgotPasswordSchema } from '~~/shared/schemas/forgotPasswordSchema'

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
    class="sm:w-100 sm:mt-20 pt-14 sm:pt-6 h-full sm:h-fit rounded-none sm:rounded-xl mx-auto border-none bg-secondary"
  >
    <CardHeader>
      <CardTitle class="text-center">{{
        t('auth.forgotPassword.title')
      }}</CardTitle>
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
            <FieldError
              v-if="errors.length"
              :errors="errors.map(e => t(`auth.errors.${e}`))"
            />
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

        <NuxtLink to="/auth/create-user" class="hover:underline text-gray-500">
          {{ t('auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
