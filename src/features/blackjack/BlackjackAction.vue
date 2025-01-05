<script setup>
import { computed } from 'vue'
import { useBlackjackStore } from '@/stores'
import GameButton from '@/components/GameButton.vue'
import BlackjackBank from '@/features/blackjack/BlackjackBank.vue'

// Access the store
const blackjackStore = useBlackjackStore()

// Computed properties
const isDealing = computed(() => blackjackStore.isDealing)
const activeHandIndex = computed(() => blackjackStore.activeHandIndex)
const canSplit = computed(() => blackjackStore.canSplit)
const canDoubleDown = computed(() => blackjackStore.canDoubleDown)
const isPlayerTurn = computed(() => !isDealing.value && activeHandIndex.value > 0)

// Methods
const doubleDown = () => {
  blackjackStore.doubleDown()
}
const split = () => {
  blackjackStore.callSplit()
}
const stand = () => {
  blackjackStore.stand()
}
const hit = () => {
  blackjackStore.hit({})
}
</script>

<template>
  <div class="controls-row">
    <div class="controls">
      <GameButton
        @click="doubleDown"
        text="DOUBLE DOWN"
        :is-enabled="canDoubleDown && isPlayerTurn"
      />
      <GameButton @click="split" text="SPLIT" :is-enabled="canSplit && isPlayerTurn" />
      <BlackjackBank />
      <GameButton @click="stand" text="STAND" :is-enabled="isPlayerTurn" />
      <GameButton @click="hit" text="HIT" :is-enabled="isPlayerTurn" />
    </div>
  </div>
</template>

<style scoped>
.controls-row {
  text-align: center;
}
.controls {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
