<script setup>
import { computed, onMounted, watch } from 'vue'

import { useQueensStore, useModalStore } from '@/stores'

import GameArea from '@/components/common/GameArea.vue'
import GameBoard from '@/components/queens/QueensBoard.vue'
import QueensAction from '@/components/queens/control/QueensAction.vue'

const queensStore = useQueensStore()
const modalStore = useModalStore()

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
    <section class="board-side">
      <GameBoard />
    </section>
    <section class="control-side">
      <QueensAction />
    </section>
  </GameArea>
</template>

<style scoped>
.board-side {
  display: flex;
  align-items: center;
  flex: 1;
}
.control-side {
  margin-bottom: 1rem;
}
</style>
