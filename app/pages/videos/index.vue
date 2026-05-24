<script setup lang="ts">
const { appName } = useAppConfig()
const { files: videos, pending } = useFetchedFiles('video')
definePageMeta({ middleware: ['auth', 'blocked'], layout: 'default' })
useHead({ title: `Videos | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-full flex-col">
    <div class="aaa sticky top-12 z-30 flex items-center justify-between backdrop-blur-sm">
      <AppHeading :title="t('pages.videos.title')" :description="t('pages.videos.description')" />
      <UploadButton v-if="videos.length" />
    </div>
    <FilesList v-if="videos.length" :files="videos" />
    <NoFiles v-if="!videos.length && !pending" />
  </div>
</template>
