<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const { appName } = useAppConfig()
useHead({ title: `Reset password | ${appName}` })
</script>

<template>
  <ResetPasswordForm />
</template>
