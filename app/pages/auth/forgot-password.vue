<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const { appName } = useAppConfig()
useHead({ title: `Forgot password | ${appName}` })
</script>

<template>
  <ForgotPasswordForm />
</template>
