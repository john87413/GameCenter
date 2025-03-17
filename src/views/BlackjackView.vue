<script setup>
import { computed, onMounted, watch } from 'vue'

import { useBlackjackStore, useModalStore } from '@/stores'

import GameArea from '@/components/common/GameArea.vue'
import BlackjackArea from '@/components/blackjack/BlackjackArea.vue'
import BlackjackAction from '@/components/blackjack/BlackjackAction.vue'
import GameOverButton from '@/components/blackjack/GameOverButton.vue'

// store
const blackjackStore = useBlackjackStore()
const modalStore = useModalStore()

const hands = computed(() => blackjackStore.hands) // 所有手牌
const dealerHand = computed(() => blackjackStore.hands[0]) // 莊家手牌
const playerHands = computed(() => blackjackStore.hands.slice(1)) // 玩家手牌
const isGameOver = computed(() => blackjackStore.isGameOver) // 判斷遊戲是否結束
const isStartGame = computed(() => modalStore.isStartGame) // 判斷遊戲是否開始

// 遊戲開始前顯示規則和說明
onMounted(() => {
  if (hands.value.length === 0) {
    modalStore.beforeGame()
  }
})

// 初始化新遊戲
watch(isStartGame, () => {
  if (isStartGame.value) {
    blackjackStore.startNewGame()
  }
})
</script>

<template>
  <GameArea>
    <section class="dealer-side">
      <BlackjackArea v-if="dealerHand" :hand="dealerHand" :index="0" />
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
