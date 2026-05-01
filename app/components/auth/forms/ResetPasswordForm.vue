<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { resetPasswordSchema } from '~~/shared/schemas/resetPasswordSchemaFrontend'

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    password: '',
    repeatPassword: ''
  }
})

const { t } = useI18n()
const route = useRoute()

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch(`/api/auth/reset-password`, {
      method: 'POST',
      body: { ...data, token: route.query.token }
    })
    await navigateTo('/auth/success-reset-password')
  } catch (e: any) {
    console.log(e)

    setErrors({ password: e.data.message })
  }
})
</script>

<template>
  <Card
    class="sm:w-100 sm:mt-20 h-full pt-14 sm:pt-6 sm:h-fit rounded-none sm:rounded-xl mx-auto border-none bg-secondary"
  >
    <CardHeader>
      <CardTitle class="text-center">{{
        t('auth.resetPassword.title')
      }}</CardTitle>
    </CardHeader>
    <CardContent>
      <form id="reset-password-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="password">
            <Field>
              <FieldLabel for="password">
                {{ t('auth.resetPassword.passwordField') }}
              </FieldLabel>
              <Input
                type="password"
                id="password"
                v-bind="field"
                placeholder="••••••••"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError
                v-if="errors.length"
                :errors="errors.map(e => t(`auth.errors.${e}`))"
              />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="repeatPassword">
            <Field>
              <FieldLabel for="repeatPassword">
                {{ t('auth.resetPassword.repeatPasswordField') }}
              </FieldLabel>
              <Input
                type="password"
                id="repeatPassword"
                v-bind="field"
                placeholder="••••••••"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError
                v-if="errors.length"
                :errors="errors.map(e => t(`auth.errors.${e}`))"
              />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="reset-password-form">
          {{ t('auth.resetPassword.submitButton') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/login-user" class="hover:underline text-gray-500">
          {{ t('auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
