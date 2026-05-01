<script setup lang="ts">
const { t } = useI18n()

const sendMessage = () => {}
</script>

<template>
  <div
    class="absolute top-30 left-1/2 flex gap-2 w-full -translate-x-1/2 text-gray-400 dark:text-gray-600"
  >
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name="lucide:cloud-fog" />
        </EmptyMedia>
        <EmptyTitle>{{ t('ui.empty.title') }}</EmptyTitle>
        <EmptyDescription>
          {{ t('ui.empty.description') }}
          <div>
            # настройки # сайдбар # смена плана хранилища # админ панель
          </div>
          <Button class="mt-3" @class="sendMessage">Отправить письмо</Button>
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
</template>
