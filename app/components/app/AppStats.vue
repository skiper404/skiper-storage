<script setup lang="ts">
import { stats } from '@@/shared/data/stats'

const { t } = useI18n()
</script>

<template>
  <section class="border-y">
    <div class="container mx-auto grid gap-8 px-4 py-20 text-center md:grid-cols-4">
      <div v-for="item in stats" :key="item.key">
        <h3 class="text-5xl font-bold" :class="item.color">
          {{ item.value }}
        </h3>

        <p class="text-muted-foreground mt-2">
          {{ t(`pages.home.stats.items.${item.key}.label`) }}
        </p>
      </div>
    </div>
  </section>
</template>
