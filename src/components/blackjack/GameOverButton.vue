<script setup>
import { computed } from 'vue'

import GameButton from '@/components/common/GameButton.vue'
import { useBlackjackStore } from '@/stores'

// store
const blackjackStore = useBlackjackStore()

// 判斷遊戲是否結束
const isGameOver = computed(() => blackjackStore.isGameOver)

// 重新開始遊戲
const restart = () => {
  blackjackStore.startNewGame()
}
</script>

<template>
  <div class="game-over">
    <GameButton @click="restart" text="RESTART" :is-enabled="isGameOver" />
  </div>
</template>

<style scoped>
.game-over {
  margin-bottom: 1rem;
}
</style>
