<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, fetch } = useUserSession()

onMounted(async () => {
  await $fetch('/api/user/refresh-user')
  await fetch()
})
</script>
<template>
  <div class="flex flex-col items-center justify-center mt-20">
    <NuxtLink to="/plan">
      <Button variant="secondary">Back</Button>
    </NuxtLink>
    <div>Congratulation!!!</div>
    <div>Now you Storage Plan is: {{ user?.plan }}</div>
  </div>
</template>
