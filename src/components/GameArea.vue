<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { useSidebarStore } from '@/stores'

const sidebarStore = useSidebarStore()

const showSidebar = computed(() => sidebarStore.showSidebar)
const isDimmed = computed(() => sidebarStore.isDimmed)

const windowWidth = ref(window.innerWidth) // 跟踪視窗寬度
let hasClosedSidebar = false // 標誌是否已自動關閉側邊欄

// 關閉側邊欄
const closeSidebar = () => {
  sidebarStore.toggleSidebar(false)
}

const toggleDimmed = (isDimmed) => {
  sidebarStore.toggleDimmed(isDimmed)
}

// 在 mounted 時設置視窗大小監聽器
onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  window.addEventListener('resize', handleResize)

  // 自動清理
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// 使用 watchEffect 根據視窗寬度自動調整 'is-dimmed' 狀態
watchEffect(() => {
  if (windowWidth.value < 992) {
    toggleDimmed(true)
    if (!hasClosedSidebar) {
      closeSidebar() // 自動關閉側邊欄
      hasClosedSidebar = true // 設置已關閉標誌
    }
  } else {
    toggleDimmed(false)
    hasClosedSidebar = false
  }
})
</script>

<template>
  <main
    @click="isDimmed ? closeSidebar() : ''"
    :class="{ 'is-dimmed': isDimmed && showSidebar }"
    class="game-area"
  >
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped>
.is-dimmed {
  opacity: 0.5;
}

.game-area {
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 50;
  overflow: hidden;
}
</style>
