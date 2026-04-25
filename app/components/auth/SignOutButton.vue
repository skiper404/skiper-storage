<script setup lang="ts">
const { t } = useI18n()

const { signOut, data, status } = useAuth()

const isAuth = computed(() => status.value === 'authenticated')

const handleSignOut = () => signOut()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        v-if="isAuth"
        size="icon-sm"
        variant="outline"
        @click="handleSignOut"
        class="bg-blue-400 border-sky-500 text-gray-200"
      >
        <Icon name="lucide:log-out" size="20" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{{ t('ui.signOut') }}</p>
    </TooltipContent>
  </Tooltip>
</template>
