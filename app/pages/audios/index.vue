<script setup lang="ts">
const { appName } = useAppConfig()
const { files: audios, pending } = useFetchedFiles('audio')
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Audios | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-full flex-col">
    <div class="sticky top-16 z-30 flex items-center justify-between">
      <AppHeading :title="t('headings.audios.title')" :description="t('headings.audios.description')" />
      <UploadButton v-if="audios.length" />
    </div>
    <FilesList v-if="audios.length" :files="audios" />
    <NoFiles v-if="!audios.length && !pending" />
  </div>
</template>
