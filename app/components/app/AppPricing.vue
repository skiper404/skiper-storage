<script setup lang="ts">
import { filesize } from 'filesize'
import { Check } from 'lucide-vue-next'
import { plans } from '@@/shared/data/hero-plans'

const { t } = useI18n()
</script>

<template>
  <section class="container mx-auto px-4 py-32">
    <div class="mb-16 text-center">
      <h2 class="text-4xl font-bold">
        {{ t('pages.home.pricing.title') }}
      </h2>

      <p class="text-muted-foreground mt-4">
        {{ t('pages.home.pricing.description') }}
      </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <Card v-for="plan in plans" :key="plan.key" :class="plan.key === 'pro' ? 'border-primary' : ''">
        <CardHeader>
          <Badge v-if="plan.key === 'pro'" class="mb-3 w-fit">
            {{ t('pages.home.pricing.popular') }}
          </Badge>

          <CardTitle class="capitalize">
            {{ plan.title }}
          </CardTitle>

          <CardDescription>
            {{ plan.description }}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div class="mb-6 text-4xl font-bold">
            {{
              plan.price === 0
                ? `0 ${t('pages.home.pricing.price_suffix')}`
                : `${plan.price} ${t('pages.home.pricing.price_suffix')}`
            }}
          </div>

          <ul class="space-y-3">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
              <Check class="h-4 w-4" />

              <template v-if="feature === 'storage'">
                {{ filesize(plan.storage) }}
                {{ t('pages.home.pricing.features.storage') }}
              </template>

              <template v-else>
                {{ t(`pages.home.pricing.features.${feature}`) }}
              </template>
            </li>

            <li class="flex items-center gap-2">
              <Check class="h-4 w-4" />
              {{ t('pages.home.pricing.features.uploads') }}
            </li>

            <li class="flex items-center gap-2">
              <Check class="h-4 w-4" />
              {{ t('pages.home.pricing.features.account') }}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
