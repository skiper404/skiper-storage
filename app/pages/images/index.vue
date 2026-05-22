<script setup lang="ts">
const { t } = useI18n()
const { appName } = useAppConfig()
const { files: images, pending } = useFetchedFiles('image')
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Images | ${appName}` })
</script>

<template>
  <div class="flex min-h-full flex-col">
    <div class="sticky top-16 z-30 flex items-center justify-between">
      <AppHeading :title="t('headings.images.title')" :description="t('headings.images.description')" />
      <UploadButton v-if="images.length" />
    </div>
    <FilesList v-if="images.length" :files="images" />
    <NoFiles v-if="!images.length && !pending" />
  </div>
</template>
