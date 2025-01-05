<script setup>
import { ref } from 'vue'

import blackjackIcon from '@/assets/blackjack/blackjack.svg'
import queensIcon from '@/assets/queens/queens.svg'

const menuItems = ref([
  { icon: blackjackIcon, name: 'Black Jack', active: false, route: '/blackjack' },
  { icon: queensIcon, name: 'Queens', active: false, route: '/queens' }
])
</script>

<template>
  <div class="menu">
    <ul class="menu-links">
      <li v-for="item in menuItems" :key="item.name" class="nav-link">
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
  }
}
</style>
