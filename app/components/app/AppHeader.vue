<script setup lang="ts">
const { user } = useUserSession()

const isLoading = ref(false)
const isAuth = computed(() => user.value)

onMounted(() => {
  isLoading.value = true
})
</script>

<template>
  <header
    class="flex items-center bg-blue-500/80 h-12 shrink-0 fixed w-full z-20 dark:bg-gray-800/50 backdrop-blur-2xl px-4 rounded-b-2xl"
  >
    <div class="flex justify-between container mx-auto">
      <AppLogo />
      <div class="flex items-center gap-2">
        <LocaleButton v-if="isLoading" />
        <ThemeButton />
        <ButtonSkeleton v-if="!isLoading" />
        <ButtonSkeleton v-if="!isLoading" />
        <ButtonSkeleton v-if="!isLoading && isAuth" />
        <SignOutButton v-if="isAuth" />
        <AppAvatar v-if="isLoading" />
        <AvatarSkeleton v-if="isAuth && !isLoading" />
      </div>
    </div>
  </header>
</template>
