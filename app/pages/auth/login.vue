<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})
const { appName } = useAppConfig()
useHead({ title: `Login | ${appName}` })
</script>

<template>
  <LoginForm />
</template>
