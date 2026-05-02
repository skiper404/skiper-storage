<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Images | ${appName}` })

const { data } = useFetch<UploadedFile[]>('/api/files/images')

const imageFiles = computed(() => data.value ?? [])
</script>

<template>
  <div>
    <FilesList v-if="imageFiles.length" :files="imageFiles" />
    <AppLoader v-else />
  </div>
</template>
