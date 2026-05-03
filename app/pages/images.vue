<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Images | ${appName}` })

const { data } = useFetch<UploadedFile[]>('/api/files/files?category=image')

const imageFiles = computed(() => data.value ?? [])
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">
      Images | {{ imageFiles.length }} items
    </h2>
    <FilesList v-if="imageFiles.length" :files="imageFiles" />
    <AppLoader v-else />
  </div>
</template>
