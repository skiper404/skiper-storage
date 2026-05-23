<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
const { t } = useI18n()
</script>

<template>
  <div class="mt-20 flex flex-col items-center justify-center gap-2">
    <div>{{ t('pages.checkEmail') }}</div>
    <NuxtLink to="/auth/login-user">
      <Button>{{ t('ui.buttons.ok') }}</Button>
    </NuxtLink>
  </div>
</template>
