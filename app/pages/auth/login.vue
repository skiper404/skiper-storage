<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const { appName } = useAppConfig()
useHead({ title: `Login | ${appName}` })
</script>

<template>
  <LoginForm />
</template>
