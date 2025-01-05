<script setup>
import { computed, onMounted, watch } from 'vue'
import { useBlackjackStore, useModalStore, useSidebarStore } from '@/stores'

import GameArea from '@/components/GameArea.vue'
import BlackjackArea from '@/features/blackjack/BlackjackArea.vue'
import BlackjackAction from '@/features/blackjack/BlackjackAction.vue'
import GameOverButton from '@/features/blackjack/GameOverButton.vue'

const blackjackStore = useBlackjackStore()
const modalStore = useModalStore()
const sidebarStore = useSidebarStore()

const showSidebar = computed(() => sidebarStore.showSidebar)
const isDimmed = computed(() => sidebarStore.isDimmed)
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
    <BlackjackAction :class="{ 'no-pointer-events': isDimmed && showSidebar }" />
  </GameArea>
</template>

<style lang="scss" scoped>
.is-dimmed {
  opacity: 0.5;
}

.game-area {
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 50;
  overflow: hidden;

  .no-pointer-events {
    pointer-events: none;
  }
  .dealer-side {
    margin-top: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    min-height: 6.2rem;
  }
  .player-side {
    flex: 1 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
