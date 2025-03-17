<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useSidebarStore } from '@/stores'
import SidebarComponent from '@/components/layout/sidebar/SidebarComponent.vue'
import InfoComponent from '@/components/layout/gameInfo/InfoComponent.vue'
import GameAnimation from '@/components/common/GameAnimation.vue'

const SIDEBAR_BREAKPOINT = 992 // 側邊欄響應式斷點
let ticking = false

// store
const sidebarStore = useSidebarStore()

// 是否顯示側邊欄
const showSidebar = computed(() => sidebarStore.showSidebar)

// 檢查並處理側邊欄的響應式效果(遮罩 & 關閉側邊欄)
const checkSidebarResponsive = () => {
  const isNarrowScreen = window.innerWidth < SIDEBAR_BREAKPOINT
  sidebarStore.toggleNarrowScreen(isNarrowScreen)

  if (isNarrowScreen && showSidebar.value) {
    sidebarStore.toggleSidebar(false)
  }
}

// ticking 確保在一個動畫幀內只執行一次更新
// requestAnimationFrame 限制更新頻率
const handleResize = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkSidebarResponsive()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  checkSidebarResponsive() // 初始檢查
  window.addEventListener('resize', handleResize) // 監聽視窗大小變化
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="game" :class="{ 'game-expanded': showSidebar, 'game-collapsed': !showSidebar }">
    <GameAnimation />
    <SidebarComponent />
    <RouterView />
    <InfoComponent />
  </div>
</template>

<style lang="scss" scoped>
.game {
  transition: var(--tran-05);
}
.game-expanded {
  margin-left: 15rem;
}
.game-collapsed {
  margin-left: 5rem;
}
@media (max-width: 992px) {
  .game-expanded,
  .game-collapsed {
    margin-left: 0;
  }
}
</style>
