<script setup>
import { computed, onMounted, watch } from 'vue'

import { useQueensStore, useSidebarStore, useModalStore } from '@/stores'

import GameArea from '@/components/GameArea.vue'
import GameBoard from '@/features/queens/QueensBoard.vue'
import QueensAction from '@/features/queens/controll/QueensAction.vue'

const sidebarStore = useSidebarStore()
const queensStore = useQueensStore()
const modalStore = useModalStore()

const showSidebar = computed(() => sidebarStore.showSidebar)
const isDimmed = computed(() => sidebarStore.isDimmed)
const isStartGame = computed(() => modalStore.isStartGame)

const beforeGame = () => {
  modalStore.beforeGame()
}

watch(isStartGame, () => {
  if (isStartGame.value) {
    queensStore.startTimer()
  }
})

onMounted(() => {
  if (queensStore.boardState.length === 0) {
    beforeGame()
    queensStore.createBoard()
  }
})
</script>

<template>
  <GameArea>
    <section class="board-side" :class="{ 'no-pointer-events': isDimmed && showSidebar }">
      <GameBoard />
    </section>
    <section class="control-side" :class="{ 'no-pointer-events': isDimmed && showSidebar }">
      <QueensAction />
    </section>
  </GameArea>
</template>

<style scoped>
.game-area {
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
}
.board-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.control-side {
  margin-bottom: 1rem;
}
.is-dimmed {
  opacity: 0.5;
}
.no-pointer-events {
  pointer-events: none;
}
</style>
