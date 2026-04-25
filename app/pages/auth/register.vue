<script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})

const { appName } = useAppConfig()
useHead({ title: `Register | ${appName}` })
</script>

<template>
  <RegisterForm />
</template>
