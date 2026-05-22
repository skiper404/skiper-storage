<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex w-full flex-1 gap-2 text-gray-400 dark:text-gray-600">
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
      <UploadButton />
    </Empty>
  </div>
</template>
