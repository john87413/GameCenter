<script setup>
import { computed } from 'vue'

import { useQueensStore } from '@/stores'

import GridCell from '@/features/queens/GridCell.vue'
import WinMessage from '@/features/queens/WinMessage.vue'

const queensStore = useQueensStore()

const gameWon = computed(() => queensStore.gameWon)
const boardState = computed(() => queensStore.boardState)
const sectionGridColors = computed(() => queensStore.sectionGridColors)

/**
 * Handles the toggling of a cell in the game board,
 * and stops the timer if the game has been won.
 * @param {number} rowIndex - The index of the row.
 * @param {number} cellIndex - The index of the cell.
 */
function handleToggleCell(rowIndex, cellIndex) {
  // Toggle the cell at the given row and cell indices.
  queensStore.toggleCell(rowIndex, cellIndex)
  // If the game has been won, stop the timer.
  if (gameWon.value) {
    queensStore.stopTimer()
  }
}

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
  justify-content: center;
  grid-template-columns: repeat(8, 42px);
  grid-template-rows: repeat(8, 42px);
  border: 0.2rem solid var(--card-front-color);
  border-radius: 0.3rem;
  overflow: hidden;
}
</style>
