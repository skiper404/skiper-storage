<script setup lang="ts">
import 'vue-sonner/style.css'
</script>

<template>
  <div class="text-primary flex h-dvh flex-col bg-primary-foreground">
    <AppProviders>
      <AppHeader />
      <main class="container flex-1 mx-auto">
        <NuxtPage />
      </main>
      <Toaster />
      <AppFooter />
    </AppProviders>
  </div>
</template>

<style lang="css">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
