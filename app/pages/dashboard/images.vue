<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()
const { files: images, pending } = useFetchedFiles('image')
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Images | ${config.public.appName}` })
</script>

<template>
  <div class="flex min-h-full flex-col">
    <div class="sticky top-12 z-30 flex items-center justify-between backdrop-blur-sm">
      <AppHeading :title="t('pages.images.title')" :description="t('pages.images.description')" />
      <UploadButton v-if="images.length" />
    </div>
    <FilesList v-if="images.length" :files="images" />
    <NoFiles v-if="!images.length && !pending" />
  </div>
</template>
