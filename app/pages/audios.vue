<script setup lang="ts">
const { appName } = useAppConfig()
const { files: audios } = useFetchedFiles('audio')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Audios | ${appName}` })
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Audios | {{ audios.length }} items</h2>
    <FilesList v-if="audios.length" :files="audios" />
    <AppLoader v-else />
  </div>
</template>
