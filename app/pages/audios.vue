<script setup lang="ts">
const { appName } = useAppConfig()
const { files: audios } = useFetchedFiles('audio')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Audios | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-full text-zinc-500 dark:text-zinc-400">
    <div class="flex items-center justify-between sticky top-16 z-30">
      <h2>
        {{ t('pages.audios.title') }} | {{ audios.length }}
        {{ t('ui.info.totalFiles') }}
      </h2>
      <UploadButton />
    </div>
    <FilesList v-if="audios.length" :files="audios" />
    <NoFiles v-else />
  </div>
</template>
