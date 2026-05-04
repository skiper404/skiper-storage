<script setup lang="ts">
const { appName } = useAppConfig()
const { files: images } = useFetchedFiles('image')
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Images | ${appName}` })
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Images | {{ images.length }} items</h2>
    <FilesList v-if="images.length" :files="images" />
    <AppLoader v-else />
  </div>
</template>
