<script setup>
import { useQueensStore } from '@/stores'

import GameButton from '@/components/common/GameButton.vue'
import QueensTimer from '@/components/queens/control/QueensTimer.vue'

// store
const queensStore = useQueensStore()

/**
 * 重置遊戲
 * 1. 清空棋盤
 * 2. 重置計時器
 */
const resetGame = () => {
  queensStore.clearBoard()
  queensStore.resetTimer()
}

/**
 * 清空棋盤
 * 移除所有已放置的皇后和標記
 */
const clearBoard = () => {
  queensStore.clearBoard()
}
</script>

<template>
  <div class="controls">
    <GameButton @click="resetGame" text="RESET GAME" :is-enabled="true" />
    <QueensTimer />
    <GameButton @click="clearBoard" text="CLEAR BOARD" :is-enabled="true" />
  </div>
</template>

<style scoped>
/* 控制區域樣式 */
.controls {
  display: flex;
}
</style>
