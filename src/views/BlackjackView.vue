<script setup>
import { computed, onMounted, watch } from 'vue'
import { useBlackjackStore, useModalStore } from '@/stores'

import GameArea from '@/components/common/GameArea.vue'
import BlackjackArea from '@/components/blackjack/BlackjackArea.vue'
import BlackjackAction from '@/components/blackjack/BlackjackAction.vue'
import GameOverButton from '@/components/blackjack/GameOverButton.vue'

const blackjackStore = useBlackjackStore()
const modalStore = useModalStore()

const hands = computed(() => blackjackStore.hands)
const playerHands = computed(() => blackjackStore.hands.slice(1))
const isGameOver = computed(() => blackjackStore.isGameOver)
const isStartGame = computed(() => modalStore.isStartGame)

onMounted(() => {
  if (blackjackStore.hands.length === 0) {
    beforeGame()
  }
})

const beforeGame = () => {
  modalStore.beforeGame()
}

watch(isStartGame, () => {
  if (isStartGame.value) {
    blackjackStore.startNewGame()
  }
})
</script>

<template>
  <GameArea>
    <section class="dealer-side">
      <BlackjackArea v-if="hands.length" :hand="hands[0]" :index="0" />
    </section>
    <section class="player-side">
      <BlackjackArea v-for="(hand, i) in playerHands" :key="i" :hand="hand" :index="i + 1" />
    </section>
    <GameOverButton v-if="isGameOver" />
    <BlackjackAction />
  </GameArea>
</template>

<style lang="scss" scoped>
.dealer-side {
  margin-top: 1rem;
}
.player-side {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
}
</style>
