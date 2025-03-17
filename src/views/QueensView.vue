<script setup>
import { computed, onMounted, watch } from 'vue'

import { useQueensStore, useModalStore } from '@/stores'

import GameArea from '@/components/common/GameArea.vue'
import QueensBoard from '@/components/queens/QueensBoard.vue'
import QueensAction from '@/components/queens/control/QueensAction.vue'

// store
const queensStore = useQueensStore()
const modalStore = useModalStore()

// 檢查遊戲是否開始
const isStartGame = computed(() => modalStore.isStartGame)

// 顯示遊戲說明和規則的 modal
const beforeGame = () => {
  modalStore.beforeGame()
}

// 啟動計時器
watch(isStartGame, () => {
  if (isStartGame.value) {
    queensStore.startTimer()
  }
})

// 如果棋盤為空:
// 1. 顯示遊戲說明
// 2. 創建新的遊戲棋盤
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
      <QueensBoard />
    </section>
    <section class="control-side">
      <QueensAction />
    </section>
  </GameArea>
</template>

<style scoped>
/* 棋盤區域樣式 */
.board-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
/* 控制區域樣式 */
.control-side {
  margin-bottom: 1rem;
}
</style>
