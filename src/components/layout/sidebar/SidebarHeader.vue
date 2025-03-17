<script setup>
import { computed } from 'vue'

import { useSidebarStore } from '@/stores'

// store
const sidebarStore = useSidebarStore()
// 監聽螢幕寬度
const isNarrowScreen = computed(() => sidebarStore.isNarrowScreen)

// 關閉側邊欄，只在窄螢幕時執行關閉動作
const closeSidebar = () => {
  if (isNarrowScreen.value) sidebarStore.toggleSidebar(false)
}

// 切換側邊欄開關狀態
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
}
</script>

<template>
  <header>
    <RouterLink to="/" class="image-text" @click="closeSidebar">
      <div class="image">
        <img src="@/assets/logo.svg" alt="logo" />
      </div>

      <div class="text header-text">
        <span class="name">Game On</span>
        <span class="profession">Fun Never Ends</span>
      </div>
    </RouterLink>

    <i class="bx bx-chevron-right toggle" @click="toggleSidebar"></i>
  </header>
</template>

<style lang="scss" scoped>
.sidebar {
  header {
    position: relative;
    padding: 0.7rem 1rem;

    // Logo 和文字的外層容器
    .image-text {
      display: flex;
      align-items: center;

      // Logo 圖片樣式
      .image {
        margin-right: 0.7rem;
        display: flex;

        img {
          width: 2.8rem;
        }
      }

      // 文字區域樣式
      .header-text {
        display: flex;
        flex-direction: column;

        .name {
          font-weight: 600;
        }

        .profession {
          margin-top: -0.2rem;
        }
      }
    }

    // 收合按鈕樣式
    .toggle {
      position: absolute;
      top: 50%;
      right: -1.1rem;
      transform: translateY(-50%) rotate(180deg);
      height: 1.6rem;
      width: 1.6rem;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--menu-text-color);
      border-radius: 50%;
      font-size: 1.4rem;
      transition: var(--tran-04);
    }
  }

  // 側邊欄收合時的按鈕樣式
  &.close {
    .toggle {
      transform: translateY(-50%);
    }
  }
}
</style>
