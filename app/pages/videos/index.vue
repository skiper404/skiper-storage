<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Videos | ${appName}` })

const { data } = useFetch<UploadedFile[]>(() => `/api/files/videos`)

const videoFiles = computed(() => data.value ?? [])
</script>

<template>
  <div>
    <FilesList v-if="videoFiles.length" :files="videoFiles" />
    <AppLoader v-else />
  </div>
</template>
