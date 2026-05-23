<script setup lang="ts">
import { useSidebar } from '../ui/sidebar'

const { t } = useI18n()
const { open } = useSidebar()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <SidebarTrigger />
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ open ? t('system.sidebar.hide') : t('system.sidebar.show') }}</p>
    </TooltipContent>
  </Tooltip>
</template>
