<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores'

// store
const sidebarStore = useSidebarStore()

// 監聽深色模式狀態
const darkMode = computed(() => sidebarStore.darkMode)
// 監聽側邊欄展開狀態
const showSidebar = computed(() => sidebarStore.showSidebar)

// 切換深色模式
const toggleDarkMode = () => {
  sidebarStore.toggleDarkMode()
  if (darkMode.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
</script>

<template>
  <div class="bottom-content">
    <li class="mode">
      <div class="sun-moon" :class="{ close: !showSidebar }">
        <i v-if="darkMode" class="bx bx-moon icon moon"></i>
        <i v-else class="bx bx-sun icon sun"></i>
      </div>
      <span class="mode-text text">{{ darkMode ? 'Dark mode' : 'Light mode' }}</span>
      <div class="toggle-switch">
        <span class="switch" :class="{ dark: darkMode }" @click="toggleDarkMode"></span>
      </div>
    </li>
  </div>
</template>

<style lang="scss" scoped>
li {
  // 切換模式容器樣式
  &.mode {
    padding: 0.7rem 1.2rem;
    position: relative;
    background: var(--primary-color-light);
    transition: background-color 0s;
    cursor: default;

    // 太陽/月亮圖標容器樣式
    .sun-moon {
      // 側邊欄收合時隱藏圖標
      &.close {
        opacity: 0;
      }
    }

    // 切換開關容器樣式
    .toggle-switch {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-width: 60px;
      cursor: pointer;

      /* 開關按鈕樣式 */
      .switch {
        position: relative;
        height: 1.4rem;
        width: 2.8rem;
        border-radius: 1.3rem;
        background: var(--toggle-color);

        /* 開關圓形按鈕 */
        &::before {
          content: '';
          position: absolute;
          height: 0.9rem;
          width: 0.9rem;
          border-radius: 50%;
          top: 50%;
          left: 0.4rem;
          transform: translateY(-50%);
          background: var(--sidebar-color);
          transition: var(--tran-03);
        }

        /* 深色模式時圓形按鈕位置 */
        &.dark::before {
          left: 1.7rem;
        }
      }
    }
  }
}
</style>
