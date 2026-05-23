<script setup lang="ts">
const theme = useColorMode()

const { t } = useI18n()

theme.preference = 'dark'

const toggleTheme = () => {
  theme.preference = theme.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button size="icon-sm" variant="ghost" @click="toggleTheme">
        <Icon v-if="theme.preference === 'light'" name="lucide:sun" size="20" />
        <Icon v-else name="lucide:moon" size="20" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ t('features.settings.theme.current', { theme: theme.preference }) }}</p>
    </TooltipContent>
  </Tooltip>
</template>
