<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
</script>

<template>
  <div class="flex mt-20 items-center gap-2 justify-center flex-col">
    <div>Пароль успешно изменен!</div>
    <NuxtLink to="/auth/login-user">
      <Button>Прекрасно</Button>
    </NuxtLink>
  </div>
</template>
