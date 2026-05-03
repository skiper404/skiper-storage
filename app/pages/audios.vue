<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Audios | ${appName}` })

const { data } = useFetch<UploadedFile[]>('/api/files/files?category=audio')

const audioFiles = computed(() => data.value ?? [])
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">
      Audios | {{ audioFiles.length }} items
    </h2>
    <FilesList v-if="audioFiles.length" :files="audioFiles" />
    <AppLoader v-else />
  </div>
</template>
