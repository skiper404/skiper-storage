<script setup lang="ts">
const { appName } = useAppConfig()
const { files } = useFetchedFiles()

definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Home | ${appName}` })
</script>

<template>
  <div
    class="flex flex-col items-center text-zinc-500 dark:text-zinc-400 min-h-full"
  >
    <h2 class="text-lg font-semibold self-start">
      Home | {{ files.length }} items
    </h2>
    <FilesList v-if="files.length" :files="files" />
    <NoFiles v-else />
  </div>
</template>
