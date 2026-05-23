<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Badge variant="destructive"> {{ t('ui.status.blocked') }} </Badge>
</template>
