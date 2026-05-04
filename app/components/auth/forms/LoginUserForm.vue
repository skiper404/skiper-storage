<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { loginUserSchema } from '~~/shared/schemas/loginUserSchema'

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(loginUserSchema),
  initialValues: {
    email: '',
    password: ''
  }
})

const { t } = useI18n()

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/login-user', {
      method: 'POST',
      body: data
    })
    await navigateTo('/')
  } catch (e: any) {
    setErrors({ email: e.data.message, password: e.data.message })
  }
})
</script>

<template>
  <Card
    class="sm:w-100 sm:pt-6 sm:mt-20 h-full sm:h-fit rounded-none sm:rounded-xl mx-auto border-none bg-secondary"
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('auth.login.title') }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form id="login-user-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="email">
            <Field>
              <FieldLabel for="email">
                {{ t('auth.login.emailField') }}
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

          <VeeField v-slot="{ field, errors }" name="password">
            <Field>
              <FieldLabel for="password">
                {{ t('auth.login.passwordField') }}
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
        </FieldGroup>
      </form>

      <div class="flex items-center gap-4 justify-center p-4">
        <div class="h-0.5 bg-secondary-foreground w-full"></div>
        <span class="text-primary">{{ t('auth.login.separator') }}</span>
        <div class="h-0.5 bg-secondary-foreground w-full"></div>
      </div>

      <Button as-child class="w-full" variant="outline" size="lg">
        <a href="/api/auth/github">
          <Icon name="fa:github" size="20" class="text-primary" />
          {{ t('auth.login.oauth') }} GitHub
        </a>
      </Button>

      <Button as-child class="w-full mt-4" variant="outline" size="lg">
        <a href="/api/auth/google">
          <Icon name="logos:google-icon" size="20" />
          {{ t('auth.login.oauth') }} Google
        </a>
      </Button>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="login-user-form">
          {{ t('auth.login.submitButton') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/create-user" class="hover:underline text-gray-500">
          {{ t('auth.login.createAccount') }}
        </NuxtLink>
        <NuxtLink
          to="/auth/forgot-password"
          class="hover:underline text-gray-500"
        >
          {{ t('auth.forgotPassword.link') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
