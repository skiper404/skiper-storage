<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const { appName } = useAppConfig()
useHead({ title: `Login user | ${appName}` })
</script>

<template>
  <LoginUserForm />
</template>
