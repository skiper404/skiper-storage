<script setup lang="ts">
import type { UploadedFile } from '~/types/uploaded-file.type'

definePageMeta({
  pageTransition: { name: 'page', mode: 'default' }
})

const route = useRoute()
const { data: file } = await useFetch<UploadedFile>(
  () => `/api/files/${route.params.id}`
)
</script>

<template>
  <div
    v-if="file"
    class="flex flex-col items-center h-full p-2 space-y-4 pt-14"
  >
    <NuxtLink to="/" class="cursor-pointer mr-auto">
      <Button variant="outline">
        <Icon name="lucide:arrow-left" size="20" />
      </Button>
    </NuxtLink>

    <FileHeader :name="file.originalName" :category="file.category" />
    <div class="flex items-center h-full max-w-2xl">
      <ImageView v-if="file.category === 'image'" :file="file" />
      <VideoView v-if="file.category === 'video'" :file="file" />
      <AudioView v-if="file.category === 'audio'" :file="file" />
    </div>

    <FileActionBar :file="file" />
  </div>
</template>
