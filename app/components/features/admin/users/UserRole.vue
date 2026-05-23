<script setup lang="ts">
import type { Role } from '~~/prisma/generated/enums'

const props = defineProps<{ role: Role }>()
</script>

<template>
  <div class="w-full text-right">
    <Badge :variant="role === 'ADMIN' ? 'destructive' : 'outline'">
      {{ role }}
    </Badge>
  </div>
</template>
