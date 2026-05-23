<script setup lang="ts">
import { filesize } from 'filesize'

const { user } = useUserSession()
const { t } = useI18n()
const localePath = useLocalePath()
const { totalFileSizeInBytes, storagePlanLimit, totalFileSizeInPercentage } = useStorage()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Icon name="lucide:credit-card" size="18" />
        {{ t('features.settings.subscription.title') }}
      </CardTitle>

      <CardDescription>
        {{ t('features.settings.subscription.description') }}
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">
            {{ t('features.settings.subscription.currentPlan') }}
          </p>

          <p class="text-muted-foreground text-sm">
            {{ t('features.settings.subscription.freePlan') }}
          </p>
        </div>

        <Badge>
          {{ user?.plan }}
        </Badge>
      </div>

      <Separator />

      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span>{{ t('features.settings.subscription.storage') }}</span>
          <span class="text-muted-foreground">
            {{ filesize(totalFileSizeInBytes) }} of {{ filesize(storagePlanLimit) }} used
          </span>
        </div>

        <Progress :model-value="totalFileSizeInPercentage" />
      </div>

      <NuxtLink :to="localePath('/plan')">
        <Button
          class="w-full bg-linear-to-r from-violet-700 via-indigo-700 to-blue-900 text-zinc-200 hover:bg-linear-to-l"
        >
          <Icon name="lucide:sparkles" size="18" />
          {{ t('features.settings.subscription.upgrade') }}
        </Button>
      </NuxtLink>
    </CardContent>
  </Card>
</template>
