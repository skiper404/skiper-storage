<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
const { t } = useI18n()
</script>

<template>
  <div class="mt-20 flex flex-col items-center justify-center gap-2">
    <div>{{ t('auth.messages.passwordChanged') }}</div>
    <NuxtLink to="/auth/login-user">
      <Button>{{ t('auth.messages.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
