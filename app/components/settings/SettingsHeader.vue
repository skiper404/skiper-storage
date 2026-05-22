<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        {{ t('settings.title') }}
      </h1>

      <p class="text-muted-foreground mt-1 text-sm">
        {{ t('settings.description') }}
      </p>
    </div>
  </div>
</template>
