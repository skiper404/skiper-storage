<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Home | ${appName}` })

const { data } = useFetch<UploadedFile[]>(() => `/api/files/files`)

const allFiles = computed(() => data.value ?? [])
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">Home | {{ allFiles.length }} items</h2>
    <FilesList v-if="allFiles.length" :files="allFiles" />
    <AppLoader v-else />
  </div>
</template>
