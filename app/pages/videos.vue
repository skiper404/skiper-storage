<script setup lang="ts">
const { appName } = useAppConfig()
const { files: videos } = useFetchedFiles('video')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Videos | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col text-zinc-500 dark:text-zinc-400 min-h-full">
    <div class="flex items-center justify-between sticky top-16 z-30">
      <h2>
        {{ t('pages.videos.title') }} | {{ videos.length }}
        {{ t('ui.info.totalFiles') }}
      </h2>
      <UploadButton />
    </div>
    <FilesList v-if="videos.length" :files="videos" />
    <NoFiles v-else />
  </div>
</template>
