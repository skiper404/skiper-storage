<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const { appName } = useAppConfig()
useHead({ title: `Reset password | ${appName}` })
</script>

<template>
  <ResetPasswordForm />
</template>
