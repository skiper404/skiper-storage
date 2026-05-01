<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})

const { appName } = useAppConfig()
useHead({ title: `Create user | ${appName}` })
</script>

<template>
  <CreateUserForm />
</template>
