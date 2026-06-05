<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const config = useRuntimeConfig()
useHead({ title: `Login user | ${config.public.appName}` })
</script>

<template>
  <LoginUserForm />
</template>
