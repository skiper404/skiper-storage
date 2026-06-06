<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate'
import {createUserSchema} from '~~/shared/schemas/create-users-schema'

const { t } = useI18n()
const localePath = useLocalePath()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(createUserSchema),
  initialValues: {
    username: '',
    email: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async data => {
  try {
    await $fetch('/api/auth/create-user', {
      method: 'POST',
      body: data
    })
    await navigateTo(localePath('/dashboard'))
  } catch (e: any) {
    setErrors({email: e.data.message})
  }
})
</script>

<template>
  <Card
    class="sm:w-100 sm:mt-20 pt-14 sm:pt-6 h-full sm:h-fit rounded-none sm:rounded-xl mx-auto border-none bg-secondary""
  >
    <CardHeader>
      <CardTitle class="text-center">{{ t('features.auth.create.title') }}</CardTitle>
    </CardHeader>
    <CardContent>
      <form id="create-user-form" @submit.prevent="onSubmit">
        <FieldGroup>
        <VeeField v-slot="{ field, errors }" name="username">
            <Field>
              <FieldLabel for="username">
                {{ t('features.auth.create.username') }}
              </FieldLabel>
              <Input
                id="username"
                v-bind="field"
                placeholder="skiper"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError
                v-if="errors.length"
                :errors="errors.map(e => t(`features.auth.errors.${e}`))"
              />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="email">
            <Field>
              <FieldLabel for="email">
                {{ t('features.auth.create.email') }}
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
                :errors="errors.map(e => t(`features.auth.errors.${e}`))"
              />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="password">
            <Field>
              <FieldLabel for="password">
                {{ t('features.auth.create.password') }}
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
                :errors="errors.map(error => t(`features.auth.errors.${error}`))"
              />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col">
      <Field>
        <Button type="submit" form="create-user-form">
          {{ t('features.auth.create.submit') }}
        </Button>
      </Field>

      <Field class="mt-4 text-center text-xs">
        <span class="text-xs">{{ t('features.auth.create.haveAccount') }}</span>

        <NuxtLink :to="localePath('/auth/login-user')" class="hover:underline text-gray-500">
          {{ t('features.auth.create.login') }}
        </NuxtLink>
      </Field>
    </CardFooter>
  </Card>
</template>
