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
    class="bg-secondary/50 text-primary fixed z-20 flex h-12 w-full items-center justify-between rounded-b-2xl px-4 backdrop-blur-xs"
  >
    <AppLogo />

    <div class="flex items-center gap-2">
      <SidebarToggleButton v-if="user" />
      <LocaleButton v-if="isLoading" />
      <ButtonSkeleton v-if="!isLoading" />
      <ThemeButton />
      <SignOutButton v-if="isAuth" />
      <AppAvatar v-if="isLoading" />
      <AvatarSkeleton v-if="isAuth && !isLoading" />
    </div>
  </header>
</template>
