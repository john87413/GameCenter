<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores'

import SidebarHeader from '@/components/layout/sidebar/SidebarHeader.vue'
import SidebarMenu from '@/components/layout/sidebar/SidebarMenu.vue'
import SidebarBottom from '@/components/layout/sidebar/SidebarBottom.vue'

const sidebarStore = useSidebarStore()

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
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--sidebar-color);
  transition: var(--tran-05);
  transform: translateX(0);
  z-index: 999;

  .menu-bar {
    height: calc(100% - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &.close {
    width: 5rem;
  }

  &.open {
    width: 15rem;
  }
}

@media (max-width: 992px) {
  .sidebar {
    &.close {
      transform: translateX(-100%);
    }

    &.open {
      transform: translateX(0);
    }
  }
}
</style>
