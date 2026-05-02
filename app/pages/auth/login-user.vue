<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const { appName } = useAppConfig()
useHead({ title: `Login user | ${appName}` })
</script>

<template>
  <LoginUserForm />
</template>
