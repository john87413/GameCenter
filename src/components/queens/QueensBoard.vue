<script setup>
import { computed } from 'vue'

import { useQueensStore } from '@/stores'

import GridCell from '@/components/queens/GridCell.vue'
import WinMessage from '@/components/queens/WinMessage.vue'

// store
const queensStore = useQueensStore()

// 是否獲勝
const gameWon = computed(() => queensStore.gameWon)
// 棋盤狀態
const boardState = computed(() => queensStore.boardState)
// 棋盤區塊顏色配置
const sectionGridColors = computed(() => queensStore.sectionGridColors)

// 處理格子點擊事件
function handleToggleCell(rowIndex, cellIndex) {
  queensStore.toggleCell(rowIndex, cellIndex) // 切換格子狀態 (空 -> 標記 -> 皇后)
  if (gameWon.value) {
    queensStore.stopTimer()
  }
}

// 檢查指定位置的皇后是否有效
function isValidQueen(rowIndex, cellIndex) {
  return queensStore.queens.some(
    (queen) => queen.row === rowIndex && queen.col === cellIndex && !queen.valid
  )
}
</script>

<template>
  <div class="game-board">
    <template v-for="(row, rowIndex) in boardState">
      <GridCell
        v-for="(cell, cellIndex) in row"
        :key="`${rowIndex}-${cellIndex}`"
        :content="cell.content"
        :color="sectionGridColors[cell.section]"
        :invalid="isValidQueen(rowIndex, cellIndex)"
        @click="handleToggleCell(rowIndex, cellIndex)"
      />
    </template>
  </div>
  <WinMessage v-if="gameWon" />
</template>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(8, 42px);
  grid-template-rows: repeat(8, 42px);
  border: 0.2rem solid var(--card-front-color);
  border-radius: 0.3rem;
}
</style>
