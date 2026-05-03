<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Videos | ${appName}` })

const { data } = useFetch<UploadedFile[]>(
  () => `/api/files/files?category=video`
)

const videoFiles = computed(() => data.value ?? [])
</script>

<template>
  <div class="text-zinc-500 dark:text-zinc-400">
    <h2 class="text-lg font-semibold">
      Videos | {{ videoFiles.length }} items
    </h2>
    <FilesList v-if="videoFiles.length" :files="videoFiles" />
    <AppLoader v-else />
  </div>
</template>
