<script setup lang="ts">
const { appName } = useAppConfig()
const { files: videos, pending } = useFetchedFiles('video')
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Videos | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-full flex-col">
    <div class="sticky top-16 z-30 flex items-center justify-between">
      <AppHeading :title="t('headings.videos.title')" :description="t('headings.videos.description')" />
      <UploadButton v-if="videos.length" />
    </div>
    <FilesList v-if="videos.length" :files="videos" />
    <NoFiles v-if="!videos.length && !pending" />
  </div>
</template>
