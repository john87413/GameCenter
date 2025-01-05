<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores'

const sidebarStore = useSidebarStore()

const darkMode = computed(() => sidebarStore.darkMode)
const showSidebar = computed(() => sidebarStore.showSidebar)

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
  &.mode {
    padding: 0.7rem 1.2rem;
    position: relative;
    background: var(--primary-color-light);
    cursor: default;
    .sun-moon {
      display: flex;
      align-items: center;
      opacity: 1;
      transition: var(--tran-03);

      &.close {
        opacity: 0;
      }
    }

    .toggle-switch {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-width: 60px;
      cursor: pointer;

      .switch {
        position: relative;
        height: 1.4rem;
        width: 2.8rem;
        border-radius: 1.3rem;
        background: var(--toggle-color);

        &::before {
          content: '';
          position: absolute;
          height: 0.9rem;
          width: 0.9rem;
          border-radius: 50%;
          top: 50%;
          left: 6px;
          transform: translateY(-50%);
          background: var(--sidebar-color);
          transition: var(--tran-03);
        }

        &.dark::before {
          left: 26px;
        }
      }
    }
  }
}
</style>
