<script setup lang="ts">
import { BLOCK_REASONS } from '~~/shared/data/block-reasons'

const { t } = useI18n()
const selectedReason = defineModel<string>()
</script>

<template>
  <Select v-model="selectedReason">
    <SelectTrigger class="mx-auto w-full">
      <SelectValue :placeholder="t('features.admin.blockReasons.selectPlaceholder')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="reason" v-for="reason in BLOCK_REASONS">
          <span class="uppercase">
            {{ reason }}
          </span>
          - {{ t(`features.admin.blockReasons.${reason}`) }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
