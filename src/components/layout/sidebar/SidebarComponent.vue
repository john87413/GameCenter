<script setup>
import { computed } from 'vue'

import { useSidebarStore } from '@/stores'

import SidebarHeader from '@/components/layout/sidebar/SidebarHeader.vue'
import SidebarMenu from '@/components/layout/sidebar/SidebarMenu.vue'
import SidebarBottom from '@/components/layout/sidebar/SidebarBottom.vue'

// store
const sidebarStore = useSidebarStore()

// 監聽側邊欄的展開/收合
const showSidebar = computed(() => sidebarStore.showSidebar)
</script>

<template>
  <nav class="sidebar" :class="{ open: showSidebar, close: !showSidebar }">
    <SidebarHeader />

    <div class="menu-bar">
      <SidebarMenu />
      <SidebarBottom />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
// 側邊欄基本樣式
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--sidebar-color);
  transition:
    width 0.5s,
    transform 0.5s;
  transform: translateX(0);
  z-index: 999;

  // 選單容器樣式
  .menu-bar {
    height: calc(100% - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  // 收合
  &.close {
    width: 5rem;
  }

  // 展開
  &.open {
    width: 15rem;
  }
}

@media (max-width: 992px) {
  .sidebar {
    // 收合
    &.close {
      transform: translateX(-100%);
    }

    // 展開
    &.open {
      transform: translateX(0);
    }
  }
}
</style>
