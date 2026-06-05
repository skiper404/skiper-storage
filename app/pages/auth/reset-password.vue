<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const config = useRuntimeConfig()
useHead({ title: `Reset password | ${config.public.appName}` })
</script>

<template>
  <ResetPasswordForm />
</template>
