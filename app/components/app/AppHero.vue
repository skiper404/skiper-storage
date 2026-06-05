<script setup lang="ts">
import { Shield, Cloud, CreditCard, Database } from 'lucide-vue-next'

const { t } = useI18n()
const theme = useColorMode()

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="container mx-auto px-4">
    <div class="flex min-h-[85vh] flex-col items-center justify-center text-center">
      <Badge variant="secondary" class="mb-6">
        {{ t('pages.home.hero.badge') }}
      </Badge>

      <h1 class="max-w-5xl text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
        {{ t('pages.home.hero.title_part_1') }}
        <hr />
        <span class="bg-linear-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent">
          {{ t('pages.home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="text-muted-foreground mt-6 max-w-2xl text-lg sm:text-xl">
        {{ t('pages.home.hero.description') }}
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <NuxtLink href="/auth/login-user">
          <Button size="lg">
            {{ t('pages.home.hero.buttons.get_started') }}
          </Button>
        </NuxtLink>

        <Button variant="outline" size="lg" @click="scrollToFeatures">
          {{ t('pages.home.hero.buttons.view_features') }}
        </Button>
      </div>

      <div class="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div class="flex items-center gap-2">
          <Shield class="h-4 w-4 text-indigo-500" />
          {{ t('pages.home.hero.features.auth') }}
        </div>

        <div class="flex items-center gap-2">
          <Cloud class="h-4 w-4 text-violet-500" />
          {{ t('pages.home.hero.features.storage') }}
        </div>

        <div class="flex items-center gap-2">
          <Database class="h-4 w-4 text-sky-500" />
          {{ t('pages.home.hero.features.db') }}
        </div>

        <div class="flex items-center gap-2">
          <CreditCard class="h-4 w-4 text-blue-500" />
          {{ t('pages.home.hero.features.subscriptions') }}
        </div>
      </div>

      <Card class="mt-20 w-full max-w-6xl">
        <NuxtImg
          :src="theme.preference === 'dark' ? '/preview-dark.png' : '/preview-light.png'"
          alt="preview"
          class="w-full"
        />
      </Card>
    </div>
  </section>
</template>
