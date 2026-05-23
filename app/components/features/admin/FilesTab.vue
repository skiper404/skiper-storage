<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{ files: AdminFile[] }>()
</script>

<template>
  <TabsContent value="files" class="mt-6">
    <Card class="border-border border">
      <CardHeader>
        <CardTitle>{{ t('features.admin.files.title') }}</CardTitle>
        <CardDescription> {{ t('features.admin.files.description') }} </CardDescription>
      </CardHeader>

      <CardContent class="sm:px-auto px-0">
        <div class="bg-background w-full">
          <FileRow v-for="(file, i) in files" :key="file.id" :file="file" :class="{ 'bg-secondary/40': i % 2 }" />
        </div>
      </CardContent>
    </Card>
  </TabsContent>
</template>
