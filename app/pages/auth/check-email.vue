<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
const { t } = useI18n()
</script>

<template>
  <div class="flex mt-20 justify-center flex-col gap-2 items-center">
    <div>{{ t('auth.messages.resetLinkSent') }}</div>
    <NuxtLink to="/auth/login-user">
      <Button>{{ t('auth.messages.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
