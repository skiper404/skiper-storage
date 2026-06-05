<template>
  <div class="flex w-full">
    <AppHeader />
    <AppSidebar class="mt-12" />
    <main class="mt-12 flex-1 p-4">
      <slot />
    </main>
  </div>
</template>
