<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { forgotPasswordSchema } from '~~/shared/schemas/forgot-password-schema'

const { t } = useI18n()
const localePath = useLocalePath()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: ''
  }
})

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: data
    })
    await navigateTo(localePath('/auth/check-email'))
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
      <CardTitle class="text-center">{{ t('features.auth.forgotPassword.title') }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form id="forgot-password-form" @submit.prevent="onSubmit">
        <VeeField v-slot="{ field, errors }" name="email">
          <Field>
            <FieldLabel for="email">
              {{ t('features.auth.forgotPassword.email') }}
            </FieldLabel>
            <Input
              id="email"
              v-bind="field"
              placeholder="example@mail.com"
              autocomplete="off"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors.map(e => t(`features.auth.errors.${e}`))" />
          </Field>
        </VeeField>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="forgot-password-form">
          {{ t('features.auth.forgotPassword.submit') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('features.auth.login.noAccount') }}</span>

        <NuxtLink :to="localePath('/auth/create-user')" class="text-gray-500 hover:underline">
          {{ t('features.auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
