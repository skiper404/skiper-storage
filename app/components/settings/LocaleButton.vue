<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon-sm" class="uppercase">
        {{ locale }}
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem :key="l.code" v-for="l in locales">
        <Button
          :variant="l.code === locale ? 'secondary' : 'ghost'"
          @click="setLocale(l.code)"
        >
          {{ l.name }}
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
