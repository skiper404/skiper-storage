<script setup lang="ts">
const { user } = useUserSession()
const { appName } = useAppConfig()
definePageMeta({ middleware: 'auth', layout: 'default' })
useHead({ title: `Storage Plan | ${appName}` })

const { data } = useFetch<UploadedFile[]>(() => `/api/files/all-files`)

const files = computed(() => data.value ?? [])
</script>

<template>
  <div>
    <h2>Storage Plan</h2>
    <FilesInfoBar :files="files" />
    <div>
      My current plan: <Badge>{{ user?.plan }}</Badge>
    </div>
    <div>Upgrage plan</div>
  </div>
</template>
