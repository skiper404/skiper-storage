<script setup lang="ts">
const { t } = useI18n()

const { user, clear } = useUserSession()

const handleSignOut = async () => {
  await clear()
  await navigateTo('/auth/login')
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
      <p>{{ t('ui.signOut') }}</p>
    </TooltipContent>
  </Tooltip>
</template>
