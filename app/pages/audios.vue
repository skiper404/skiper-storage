<script setup lang="ts">
const { appName } = useAppConfig()
const { files: audios } = useFetchedFiles('audio')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Audios | ${appName}` })
const { t } = useI18n()
</script>

<template>
  <div
    class="flex flex-col min-h-full items-center text-zinc-500 dark:text-zinc-400"
  >
    <h2 class="self-start">
      {{ t('pages.audios.title') }} | {{ audios.length }}
      {{ t('ui.info.totalFiles') }}
    </h2>
    <FilesList v-if="audios.length" :files="audios" />
    <NoFiles v-else />
  </div>
</template>
