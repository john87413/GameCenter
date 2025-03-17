<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useSidebarStore } from '@/stores'

import blackjackIcon from '@/assets/blackjack/blackjack.svg'
import queensIcon from '@/assets/queens/queens.svg'

// router
const route = useRoute()
// store
const sidebarStore = useSidebarStore()

// 監聽螢幕寬度狀態
const isNarrowScreen = computed(() => sidebarStore.isNarrowScreen)

// 選單資料
const menuItems = ref([
  { icon: blackjackIcon, name: 'Black Jack', route: '/blackjack' },
  { icon: queensIcon, name: 'Queens', route: '/queens' }
])

// 判斷選單是否為當前活動頁面
const isActive = (itemRoute) => {
  return route.path === itemRoute
}

// 關閉側邊欄函數（僅在窄螢幕時執行）
const closeSidebar = () => {
  if (isNarrowScreen.value) sidebarStore.toggleSidebar(false)
}
</script>

<template>
  <div class="menu">
    <ul class="menu-links">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="nav-link"
        :class="{ active: isActive(item.route) }"
        @click="closeSidebar()"
      >
        <RouterLink :to="item.route">
          <div class="menu-game-icon">
            <img :src="item.icon" alt="game icon" />
          </div>
          <span class="text nav-text">{{ item.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  .nav-link {
    // 選單圖標
    img {
      width: 2.2rem;
    }

    // 選中狀態
    &.active {
      background: var(--primary-color);

      .text {
        color: var(--menu-text-color);
      }
    }
  }
}
</style>
