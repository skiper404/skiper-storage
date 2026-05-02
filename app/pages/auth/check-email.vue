<script setup lang="ts">
definePageMeta({ layout: 'guest', middleware: 'guest' })
</script>

<template>
  <div class="flex mt-20 justify-center flex-col gap-2 items-center">
    <div>Ссылка на смену пароля отправлена Вам на почту!</div>
    <NuxtLink to="/auth/login-user">
      <Button>Прекрасно</Button>
    </NuxtLink>
  </div>
</template>
