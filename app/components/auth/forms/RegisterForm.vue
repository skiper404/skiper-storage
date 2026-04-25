<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'

import { createSchema } from '~/schemas/createSchema'

const { t } = useI18n()
const { signIn, getSession } = useAuth()

const { handleSubmit, setErrors } = useForm({
  validationSchema: createSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: data
    })

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    await getSession()
    await navigateTo('/')
  } catch (error: any) {
    setErrors({ email: error.data.message })
  }
})
</script>

<template>
  <Card
    class="sm:w-100 sm:mt-20 h-full sm:h-fit rounded-none sm:rounded-xl mx-auto border-none"
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('auth.create.title') }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form id="register-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="email">
            <Field>
              <FieldLabel for="register">
                {{ t('auth.create.emailField') }}
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
                {{ t('auth.create.passwordField') }}
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
                :errors="errors.map(error => t(`auth.errors.${error}`))"
              />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="register-form">
          {{ t('auth.create.submitButton') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('auth.create.haveAccount') }}</span>
        <NuxtLink to="/auth/login" class="hover:underline">
          {{ t('auth.create.loginAccount') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
