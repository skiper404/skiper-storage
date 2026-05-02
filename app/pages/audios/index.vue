<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Audios | ${appName}` })

const { data } = useFetch<UploadedFile[]>('/api/files/audios')

const audioFiles = computed(() => data.value ?? [])
</script>

<template>
  <div>
    <FilesList v-if="audioFiles.length" :files="audioFiles" />
    <AppLoader v-else />
  </div>
</template>
