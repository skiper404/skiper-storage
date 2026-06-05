<script setup lang="ts">
import 'vue-sonner/style.css'
</script>

<template>
  <div class="h-dvh">
    <TooltipProvider>
      <SidebarProvider storage-key="sidebar">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <Toaster close-button />
      </SidebarProvider>
    </TooltipProvider>
  </div>
</template>
