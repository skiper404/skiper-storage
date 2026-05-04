<script setup lang="ts">
import {
  BadgeDollarSign,
  FileImageIcon,
  FileMusic,
  FileVideo2Icon,
  Home,
  Settings
} from 'lucide-vue-next'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { user } = useUserSession()

const items = computed(() => [
  {
    key: 'home',
    path: '/',
    icon: Home,
    color: 'text-violet-500'
  },
  {
    key: 'images',
    path: '/images',
    icon: FileImageIcon,
    color: 'text-indigo-500'
  },
  {
    key: 'audios',
    path: '/audios',
    icon: FileMusic,
    color: 'text-blue-500'
  },
  {
    key: 'videos',
    path: '/videos',
    icon: FileVideo2Icon,
    color: 'text-sky-500'
  },
  {
    key: 'plan',
    path: '/plan',
    icon: BadgeDollarSign,
    color: 'text-blue-400'
  },
  {
    key: 'settings',
    path: '/settings',
    icon: Settings,
    color: 'text-indigo-400'
  }
])
</script>

<template>
  <Sidebar variant="floating" class="pb-14">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.key">
              <SidebarMenuButton
                as-child
                :class="{
                  'bg-secondary': route.path === localePath(item.path)
                }"
              >
                <NuxtLink
                  :to="localePath(item.path)"
                  class="flex items-center gap-2"
                >
                  <component :is="item.icon" :class="item.color" />

                  <span>
                    {{ t(`navigation.${item.key}`) }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <UploadButton class="mt-4" />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
