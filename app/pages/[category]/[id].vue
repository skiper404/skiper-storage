<script setup lang="ts">
import type { File } from '@prisma/client'

definePageMeta({
  middleware: ['auth', 'blocked']
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { data: file } = await useFetch<File>(`/api/files/${route.params.id}`)
</script>

<template>
  <div v-if="file" class="flex h-full flex-col items-center space-y-4 p-4">
    <Button variant="outline" class="mr-auto cursor-pointer" @click="router.back()">
      <Icon name="lucide:arrow-left" size="20" />
      {{ t('ui.buttons.back') }}
    </Button>

    <FileHeader :name="file.fileName" :category="file.category" />
    <div class="flex h-full max-w-2xl items-center">
      <ImageView v-if="file.category === 'image'" :file="file" />
      <VideoView v-if="file.category === 'video'" :file="file" />
      <AudioView v-if="file.category === 'audio'" :file="file" />
    </div>

    <FileActionBar :file="file" />
  </div>
</template>
