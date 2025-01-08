<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores'

const sidebarStore = useSidebarStore()

const showSidebar = computed(() => sidebarStore.showSidebar)
const isDimmed = computed(() => sidebarStore.isDimmed)

// 關閉側邊欄
const closeSidebar = () => {
  sidebarStore.toggleSidebar(false)
}
</script>

<template>
  <main
    @click="isDimmed ? closeSidebar() : ''"
    :class="{ 'is-dimmed': isDimmed && showSidebar }"
    class="game-area"
  >
    <div class="game-area" :class="{ 'no-pointer-events': isDimmed && showSidebar }">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.is-dimmed {
  opacity: 0.5;
}
.game-area {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.no-pointer-events {
  pointer-events: none;
}
</style>
