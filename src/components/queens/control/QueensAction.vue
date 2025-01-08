<script setup>
import GameButton from '@/components/common/GameButton.vue'
import AppTimer from '@/components/queens/control/QueensTimer.vue'
import { useQueensStore } from '@/stores'

const queensStore = useQueensStore()

const resetGame = () => {
  queensStore.clearBoard()
  queensStore.resetTimer()
}
const clearBoard = () => {
  queensStore.clearBoard()
}
</script>

<template>
  <div class="controls">
    <GameButton @click="resetGame" text="RESET GAME" :is-enabled="true" />
    <AppTimer />
    <GameButton @click="clearBoard" text="CLEAR BOARD" :is-enabled="true" />
  </div>
</template>

<style scoped>
.controls {
  display: flex;
}
</style>
