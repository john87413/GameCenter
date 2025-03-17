<script setup>
import { computed } from 'vue'

import { useSidebarStore } from '@/stores'

// store
const sidebarStore = useSidebarStore()

// 是否顯示側邊欄
const showSidebar = computed(() => sidebarStore.showSidebar)
// 是否為窄屏幕
const isNarrowScreen = computed(() => sidebarStore.isNarrowScreen)

// 關閉側邊欄
const closeSidebar = () => {
  sidebarStore.toggleSidebar(false)
}
</script>

<template>
  <main
    @click="isNarrowScreen ? closeSidebar() : ''"
    :class="{ 'is-dimmed': isNarrowScreen && showSidebar }"
  >
    <div class="game-area" :class="{ 'no-pointer-events': isNarrowScreen && showSidebar }">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="scss" scoped>
// 遮罩效果
.is-dimmed {
  opacity: 0.5;
}
// 遊戲區域容器
.game-area {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
// 禁用點擊事件
.no-pointer-events {
  pointer-events: none;
}
</style>
