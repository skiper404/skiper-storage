<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex-1 flex gap-2 w-full text-gray-400 dark:text-gray-600">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name="lucide:cloud-fog" />
        </EmptyMedia>
        <EmptyTitle>{{ t('ui.empty.title') }}</EmptyTitle>
        <EmptyDescription>
          {{ t('ui.empty.description') }}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
</template>
