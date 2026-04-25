<script setup lang="ts">
const theme = useColorMode()

theme.preference = 'dark'

const toggleTheme = () =>
  (theme.preference = theme.preference === 'dark' ? 'light' : 'dark')
</script>

<template>
  <ClientOnly>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          size="icon-sm"
          variant="outline"
          @click="toggleTheme"
          class="bg-blue-400 border-sky-500 text-gray-200"
        >
          <Icon
            v-if="theme.preference === 'light'"
            name="lucide:sun"
            size="20"
          />
          <Icon v-else name="lucide:moon" size="20" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Theme: {{ theme.preference }}</p>
      </TooltipContent>
    </Tooltip>
  </ClientOnly>
</template>
