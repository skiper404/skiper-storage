<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const { appName } = useAppConfig()
useHead({ title: `Create user | ${appName}` })
</script>

<template>
  <CreateUserForm />
</template>
