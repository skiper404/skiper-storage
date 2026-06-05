<script setup lang="ts">
import { features } from '@@/shared/data/features'

const { t } = useI18n()
</script>

<template>
  <section class="container mx-auto px-4 py-32" id="features">
    <div class="mx-auto mb-16 max-w-3xl text-center">
      <h2 class="text-4xl font-bold">
        {{ t('pages.home.features.title') }}
      </h2>

      <p class="text-muted-foreground mt-4 text-lg">
        {{ t('pages.home.features.description') }}
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="feature in features" :key="feature.key">
        <CardHeader>
          <component :is="feature.icon" class="h-6 w-6" :class="feature.color" />

          <CardTitle>
            {{ t(`pages.home.features.items.${feature.key}.title`) }}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {{ t(`pages.home.features.items.${feature.key}.description`) }}
        </CardContent>
      </Card>
    </div>
  </section>
</template>
