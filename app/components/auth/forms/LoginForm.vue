<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'

import { loginSchema } from '~/schemas/loginShema'

const { handleSubmit, setErrors } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { t } = useI18n()

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/auth/login', {
      method: 'POST',
      body: data
    })
    await navigateTo('/')
  } catch (error: any) {
    console.log(error)
  }
})
</script>

<template>
  <Card
    class="sm:w-100 sm:mt-20 h-full sm:h-fit rounded-none sm:rounded-xl mx-auto border-none bg-secondary"
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('auth.login.title') }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form id="login-form" @submit.prevent="onSubmit">
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
        <a href="/auth/github">
          <Icon name="fa:github" size="20" class="text-primary" />
          {{ t('auth.login.oauth') }} GitHub
        </a>
      </Button>

      <Button as-child class="w-full mt-4" variant="outline" size="lg">
        <a href="/auth/google">
          <Icon name="logos:google-icon" size="20" />
          {{ t('auth.login.oauth') }} Google
        </a>
      </Button>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="login-form">
          {{ t('auth.login.submitButton') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('auth.login.noAccount') }}</span>

        <NuxtLink to="/auth/register" class="hover:underline">
          {{ t('auth.login.createAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
