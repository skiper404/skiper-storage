<script setup lang="ts">
const { t } = useI18n()
const { appName } = useAppConfig()
const { files: images } = useFetchedFiles('image')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Images | ${appName}` })
</script>

<template>
  <div class="flex flex-col min-h-full text-zinc-500 dark:text-zinc-400">
    <h2>
      {{ t('pages.images.title') }} | {{ images.length }}
      {{ t('ui.info.totalFiles') }}
    </h2>
    <FilesList v-if="images.length" :files="images" />
    <NoFiles v-else />
  </div>
</template>
