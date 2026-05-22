<script setup lang="ts">
import type { Plan } from '~~/prisma/generated/enums'

const props = defineProps<{ plan: Plan }>()
</script>

<template>
  <div class="hidden sm:block">
    <Badge class="capitalize">
      {{ plan }}
    </Badge>
  </div>
</template>
