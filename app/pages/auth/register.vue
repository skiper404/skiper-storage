<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})

const { appName } = useAppConfig()
useHead({ title: `Register | ${appName}` })
</script>

<template>
  <RegisterForm />
</template>
