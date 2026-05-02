<script setup lang="ts">
import { useSidebar } from '../ui/sidebar'

const { open } = useSidebar()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <SidebarTrigger />
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ open ? 'Hide sidebar' : 'Show sidebar' }}</p>
    </TooltipContent>
  </Tooltip>
</template>
