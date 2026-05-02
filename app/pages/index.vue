<script setup lang="ts">
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Home | ${appName}` })

const { data } = useFetch<UploadedFile[]>(() => `/api/files/all-files`)

const allFiles = computed(() => data.value ?? [])
</script>

<template>
  <div>
    <FilesList v-if="allFiles.length" :files="allFiles" />
    <AppLoader v-else />
  </div>
</template>
