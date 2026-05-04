<script setup lang="ts">
import 'vue-sonner/style.css'
</script>

<template>
  <div class="h-dvh">
    <TooltipProvider>
      <SidebarProvider storage-key="sidebar">
        <AppHeader />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <Toaster />
      </SidebarProvider>
    </TooltipProvider>
  </div>
</template>
