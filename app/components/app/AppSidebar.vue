<script setup lang="ts">
import {
  BadgeDollarSign,
  FileImageIcon,
  FileMusic,
  FileVideo2Icon,
  Home,
  Settings
} from 'lucide-vue-next'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Images',
    url: '/images',
    icon: FileImageIcon
  },
  {
    title: 'Audios',
    url: '/audios',
    icon: FileMusic
  },
  {
    title: 'Videos',
    url: '/videos',
    icon: FileVideo2Icon
  },
  {
    title: 'Storage Plan',
    url: '/plan',
    icon: BadgeDollarSign
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings
  }
]

const route = useRoute()
</script>

<template>
  <Sidebar variant="floating" class="pb-14">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton
                as-child
                :class="{ 'bg-secondary': route.path === item.url }"
              >
                <a :href="item.url">
                  <component
                    :is="item.icon"
                    :class="{
                      'text-violet-500': item.title === 'Home',
                      'text-indigo-500': item.title === 'Images',
                      'text-blue-500': item.title === 'Audios',
                      'text-sky-500': item.title === 'Videos',
                      'text-blue-400': item.title === 'Storage Plan',
                      'text-indigo-400': item.title === 'Settings'
                    }"
                  />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <UploadButton />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
