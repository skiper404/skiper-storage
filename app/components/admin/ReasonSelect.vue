<script setup lang="ts">
import { BLOCK_REASONS } from '~~/shared/data/block-reasons'

const selectedReason = defineModel<string>()
const { t } = useI18n()
</script>

<template>
  <Select v-model="selectedReason">
    <SelectTrigger class="mx-auto w-full">
      <SelectValue placeholder="Select the reason for deletion" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="reason" v-for="reason in BLOCK_REASONS">
          <span class="uppercase">
            {{ reason }}
          </span>
          - {{ t(`blockReasons.${reason}`) }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
