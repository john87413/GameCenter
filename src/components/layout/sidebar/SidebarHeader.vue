<script setup>
import { computed } from 'vue'

import { useSidebarStore } from '@/stores'

const sidebarStore = useSidebarStore()
const isDimmed = computed(() => sidebarStore.isDimmed)

const closeSidebar = () => {
  if (isDimmed.value) sidebarStore.toggleSidebar(false)
}

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

    .image-text {
      display: flex;
      align-items: center;

      .image {
        margin-right: 0.7rem;
        display: flex;

        img {
          width: 2.8rem;
        }
      }

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

  &.close {
    .toggle {
      transform: translateY(-50%);
    }
  }
}
</style>
