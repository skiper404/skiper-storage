<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { resetPasswordSchema } from '~~/shared/schemas/reset-password-schema-frontend'

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
    class="bg-secondary mx-auto h-full rounded-none border-none pt-14 sm:mt-20 sm:h-fit sm:w-100 sm:rounded-xl sm:pt-6"
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('features.auth.resetPassword.title') }}</CardTitle>
    </CardHeader>
    <CardContent>
      <form id="reset-password-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="password">
            <Field>
              <FieldLabel for="password">
                {{ t('features.auth.resetPassword.password') }}
              </FieldLabel>
              <Input
                type="password"
                id="password"
                v-bind="field"
                placeholder="••••••••"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors="errors.map(e => t(`auth.errors.${e}`))" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="repeatPassword">
            <Field>
              <FieldLabel for="repeatPassword">
                {{ t('features.auth.resetPassword.repeatPassword') }}
              </FieldLabel>
              <Input
                type="password"
                id="repeatPassword"
                v-bind="field"
                placeholder="••••••••"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors="errors.map(e => t(`auth.errors.${e}`))" />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="reset-password-form">
          {{ t('features.auth.resetPassword.submit') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('features.auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/login-user" class="text-gray-500 hover:underline">
          {{ t('features.auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
