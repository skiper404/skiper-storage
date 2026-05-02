<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Settings | ${appName}` })
</script>

<template>
  <div>Settings</div>
</template>
