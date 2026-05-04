<script setup lang="ts">
const { appName } = useAppConfig()
const { files } = useFetchedFiles()
const { t } = useI18n()

definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Home | ${appName}` })
</script>

<template>
  <div
    class="flex flex-col text-zinc-500 dark:text-zinc-400 min-h-full relative"
  >
    <div class="flex items-center justify-between sticky top-16 z-30">
      <h2>
        {{ t('pages.home.title') }} | {{ files.length }}
        {{ t('ui.info.totalFiles') }}
      </h2>
      <UploadButton />
    </div>
    <FilesList v-if="files.length" :files="files" />
    <NoFiles v-else />
  </div>
</template>
