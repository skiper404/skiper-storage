<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { appName } = useAppConfig()

useHead({ title: `Not found | ${appName}` })

const error = useError()
</script>

<template>
  <div class="flex h-dvh flex-col items-center justify-center">
    <Empty class="h-screen">
      <EmptyHeader>
        <EmptyTitle>{{ t('ui.notFound.title') }}</EmptyTitle>
        <EmptyDescription>
          {{ t('ui.notFound.description') }}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <NuxtLink :to="localePath('/')">
          <Button variant="secondary">{{ t('ui.notFound.button') }}</Button>
        </NuxtLink>
      </EmptyContent>
    </Empty>
  </div>
</template>
