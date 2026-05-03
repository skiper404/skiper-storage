<script setup lang="ts">
const { user } = useUserSession()

const isLoading = ref(false)
const isAuth = computed(() => user.value)

onMounted(() => {
  isLoading.value = true
})

const route = useRoute()
</script>

<template>
  <header
    class="flex items-center bg-secondary text-primary h-12 rounded-b-2xl w-full justify-between fixed z-20 backdrop-blur-xs px-4"
  >
    <AppLogo />
    <div class="flex items-center gap-2">
      <SidebarToggleButton />
      <LocaleButton v-if="isLoading" />
      <ButtonSkeleton v-if="!isLoading" />
      <ThemeButton />
      <SignOutButton v-if="isAuth" />
      <AppAvatar v-if="isLoading" />
      <AvatarSkeleton v-if="isAuth && !isLoading" />
    </div>
  </header>
</template>
