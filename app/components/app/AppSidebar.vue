<script setup lang="ts">
import { BadgeDollarSign, FileImageIcon, FileMusic, FileVideo2Icon, Home, Settings, Shield } from 'lucide-vue-next'
import { useSidebar } from '../ui/sidebar'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { user } = useUserSession()
const { toggleSidebar } = useSidebar()
const isMobile = useMediaQuery('(max-width: 768px)')

const items = computed(() => {
  const baseItems = [
    {
      key: 'allFiles',
      path: '/dashboard',
      icon: Home,
      color: 'text-violet-500'
    },
    {
      key: 'images',
      path: '/dashboard/images',
      icon: FileImageIcon,
      color: 'text-indigo-500'
    },
    {
      key: 'audios',
      path: '/dashboard/audios',
      icon: FileMusic,
      color: 'text-blue-500'
    },
    {
      key: 'videos',
      path: '/dashboard/videos',
      icon: FileVideo2Icon,
      color: 'text-sky-500'
    },
    {
      key: 'plan',
      path: '/dashboard/plan',
      icon: BadgeDollarSign,
      color: 'text-blue-400'
    },
    {
      key: 'settings',
      path: '/dashboard/settings',
      icon: Settings,
      color: 'text-indigo-400'
    }
  ]

  if (user.value?.role === 'ADMIN') {
    baseItems.push({
      key: 'admin',
      path: '/dashboard/admin',
      icon: Shield,
      color: 'text-indigo-400'
    })
  }

  return baseItems
})
</script>

<template>
  <Sidebar variant="floating" class="pb-16">
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
                  @click="isMobile ? toggleSidebar() : null"
                >
                  <component :is="item.icon" :class="item.color" />

                  <span>
                    {{ t(`system.navigation.${item.key}`) }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
