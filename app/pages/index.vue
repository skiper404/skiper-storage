<script setup lang="ts">
const config = useRuntimeConfig()

definePageMeta({
  layout: 'guest'
})

useHead({ title: config.public.appName })

const router = useRouter()

router.beforeEach(to => {
  console.log('going to:', to.fullPath)
})
</script>

<template>
  <div class="mt-16">
    <AppHero />
    <AppFeatures id="features" />
    <AppStats />
    <AppPricing />
    <AppCTA />
  </div>
</template>
