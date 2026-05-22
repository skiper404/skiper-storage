<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DashboardTab from '../../components/admin/DashboardTab.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'default'
})

const { t } = useI18n()
const { adminFiles, adminUsers } = useAdminFetchData()

const activeTab = ref('dashboard')

onMounted(() => {
  const saved = localStorage.getItem('dashboard-tab')
  if (saved) activeTab.value = saved
})

watch(activeTab, val => {
  localStorage.setItem('dashboard-tab', val)
})
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <AppHeading :title="t('headings.admin.title')" :description="t('headings.admin.description')" />
    <Tabs v-model="activeTab">
      <TabsList>
        <TabsTrigger value="dashboard"> Dashboard </TabsTrigger>
        <TabsTrigger value="users"> Users </TabsTrigger>
        <TabsTrigger value="files"> Files </TabsTrigger>
      </TabsList>
      <DashboardTab :users="adminUsers ?? []" />
      <UsersTab :users="adminUsers ?? []" />
      <FilesTab :files="adminFiles ?? []" />
    </Tabs>
  </div>
</template>
