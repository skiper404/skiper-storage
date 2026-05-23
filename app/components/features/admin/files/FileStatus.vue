<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="mx-2 ml-auto">
    <Badge variant="destructive"> {{ t('ui.status.blocked') }} </Badge>
  </div>
</template>
