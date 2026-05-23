<script setup lang="ts">
const { appName } = useAppConfig()
const { files, pending } = useFetchedFiles()
const { t } = useI18n()

definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Home | ${appName}` })
</script>

<template>
  <div class="relative flex min-h-full flex-col">
    <div class="sticky top-16 z-30 flex items-center justify-between">
      <AppHeading :title="t('pages.allFiles.title')" :description="t('pages.allFiles.description')" />
      <UploadButton v-if="files.length" />
    </div>
    <FilesList v-if="files.length" :files="files" />
    <NoFiles v-if="!files.length && !pending" />
  </div>
</template>
