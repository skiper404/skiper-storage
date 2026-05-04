<script setup lang="ts">
const { appName } = useAppConfig()
const { files } = useFetchedFiles()

definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Home | ${appName}` })
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Home | {{ files.length }} items</h2>
    <FilesList v-if="files.length" :files="files" />
    <AppLoader v-else />
  </div>
</template>
