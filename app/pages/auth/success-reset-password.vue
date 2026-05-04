<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
const { t } = useI18n()
</script>

<template>
  <div class="flex mt-20 items-center gap-2 justify-center flex-col">
    <div>{{ t('auth.messages.passwordChanged') }}</div>
    <NuxtLink to="/auth/login-user">
      <Button>{{ t('auth.messages.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
