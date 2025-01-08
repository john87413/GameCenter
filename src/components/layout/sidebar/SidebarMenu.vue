<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useSidebarStore } from '@/stores'

import blackjackIcon from '@/assets/blackjack/blackjack.svg'
import queensIcon from '@/assets/queens/queens.svg'

const route = useRoute()
const sidebarStore = useSidebarStore()

const isDimmed = computed(() => sidebarStore.isDimmed)
const menuItems = ref([
  { icon: blackjackIcon, name: 'Black Jack', route: '/blackjack' },
  { icon: queensIcon, name: 'Queens', route: '/queens' }
])

const isActive = (itemRoute) => {
  return route.path === itemRoute
}

// 關閉側邊欄
const closeSidebar = () => {
  if (isDimmed.value) sidebarStore.toggleSidebar(false)
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
    img {
      width: 2.2rem;
    }

    &.active {
      background: var(--primary-color);

      .text {
        color: var(--menu-text-color);
      }
    }
  }
}
</style>
