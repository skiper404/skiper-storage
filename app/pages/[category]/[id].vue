<script setup lang="ts">
import type { File } from '~~/prisma/generated/client'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const { data: file } = await useFetch<File>(
  () => `/api/files/${route.params.id}`
)
const localePath = useLocalePath()
</script>

<template>
  <div v-if="file" class="flex flex-col items-center h-full p-4 space-y-4">
    <NuxtLink :to="localePath('/')" class="cursor-pointer mr-auto">
      <Button variant="outline">
        <Icon name="lucide:arrow-left" size="20" />
      </Button>
    </NuxtLink>
    <FileHeader :name="file.fileName" :category="file.category" />
    <div class="flex items-center h-full max-w-2xl">
      <ImageView v-if="file.category === 'image'" :file="file" />
      <VideoView v-if="file.category === 'video'" :file="file" />
      <AudioView v-if="file.category === 'audio'" :file="file" />
    </div>

    <FileActionBar :file="file" />
  </div>
</template>
