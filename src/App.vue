<script setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/stores'
import SidebarComponent from './components/sidebar/SidebarComponent.vue'
import InfoComponent from './components/gameInfo/InfoComponent.vue'
import GameAnimation from './components/GameAnimation.vue'

const sidebarStore = useSidebarStore()
const showSidebar = computed(() => sidebarStore.showSidebar)
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
