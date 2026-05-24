<script setup lang="ts">
import { Plan } from '@prisma/client'

const props = defineProps<{ plan: Plan }>()
</script>

<template>
  <div class="hidden sm:block">
    <Badge class="capitalize">
      {{ plan }}
    </Badge>
  </div>
</template>
