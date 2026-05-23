<script setup lang="ts">
import { filesize } from 'filesize'

const props = defineProps<{ size: number }>()
</script>

<template>
  <div class="text-muted-foreground text-xs">
    <Badge variant="secondary">
      {{ filesize(size) }}
    </Badge>
  </div>
</template>
