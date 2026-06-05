<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { loginUserSchema } from '~~/shared/schemas/login-user-schema'

const { t } = useI18n()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(loginUserSchema),
  initialValues: {
    email: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/login-user', {
      method: 'POST',
      body: data
    })
    await navigateTo('/dashboard')
  } catch (e: any) {
    setErrors({ email: e.data.message, password: e.data.message })
  }
})
</script>

<template>
  <Card
    class="bg-secondary mx-auto h-full rounded-none border-none pt-14 sm:mt-20 sm:h-fit sm:w-100 sm:rounded-xl sm:pt-6"
  >
    <CardHeader>
      <CardTitle class="text-center">
        {{ t('features.auth.login.title') }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <form id="login-user-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="email">
            <Field>
              <FieldLabel for="email">
                {{ t('features.auth.login.email') }}
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

          <VeeField v-slot="{ field, errors }" name="password">
            <Field>
              <FieldLabel for="password">
                {{ t('features.auth.login.password') }}
              </FieldLabel>
              <Input
                type="password"
                id="password"
                v-bind="field"
                placeholder="••••••••"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors="errors.map(e => t(`features.auth.errors.${e}`))" />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>

      <div class="flex items-center justify-center gap-4 p-4">
        <div class="bg-secondary-foreground h-0.5 w-full"></div>
        <span class="text-primary">{{ t('features.auth.login.separator') }}</span>
        <div class="bg-secondary-foreground h-0.5 w-full"></div>
      </div>

      <Button as-child class="mt-4 w-full" variant="outline" size="lg">
        <a href="/api/auth/google">
          <Icon name="logos:google-icon" size="20" />
          {{ t('features.auth.login.oauth') }} Google
        </a>
      </Button>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="login-user-form">
          {{ t('features.auth.login.submit') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('features.auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/create-user" class="text-gray-500 hover:underline">
          {{ t('features.auth.login.createAccount') }}
        </NuxtLink>
        <NuxtLink to="/auth/forgot-password" class="text-gray-500 hover:underline">
          {{ t('features.auth.login.forgotPassword') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
