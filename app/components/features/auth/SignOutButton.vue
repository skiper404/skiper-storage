<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const { user, clear } = useUserSession()

const handleSignOut = async () => {
  await clear()
  await navigateTo(localePath('/'))
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button v-if="user" size="icon-sm" variant="ghost" @click="handleSignOut">
        <Icon name="lucide:log-out" size="20" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ t('features.auth.signOut') }}</p>
    </TooltipContent>
  </Tooltip>
</template>
