<script setup lang="ts">
import { Upload } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section class="container mx-auto px-4 pb-32">
    <Card>
      <CardContent class="flex flex-col items-center px-6 py-20 text-center">
        <Upload class="mb-6 h-12 w-12 text-violet-500" />

        <h2 class="text-4xl font-bold">
          {{ t('pages.home.cta.title') }}
        </h2>

        <p class="text-muted-foreground mt-4 max-w-xl">
          {{ t('pages.home.cta.description') }}
        </p>

        <NuxtLink href="/auth/login-user">
          <Button size="lg" class="mt-8">
            {{ t('pages.home.cta.button') }}
          </Button>
        </NuxtLink>
      </CardContent>
    </Card>
  </section>
</template>
