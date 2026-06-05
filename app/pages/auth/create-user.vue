<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })

const config = useRuntimeConfig()
useHead({ title: `Create user | ${config.public.appName}` })
</script>

<template>
  <CreateUserForm />
</template>
