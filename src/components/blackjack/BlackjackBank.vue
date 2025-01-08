<script setup>
import { ref, watch, computed } from 'vue'
import { useBlackjackStore } from '@/stores'
import HandCoin from '@/components/blackjack/hand/HandCoin.vue'

const blackjackStore = useBlackjackStore()
const isIncreasing = ref(false)
const bank = computed(() => blackjackStore.bank)
const { startingBank, minimumBet } = blackjackStore.settings

watch(
  () => bank,
  (current, previous) => {
    if (current > previous) {
      if (previous === 0 && current === startingBank - minimumBet) return
      isIncreasing.value = true
      setTimeout(() => {
        isIncreasing.value = false
      }, 1000)
    }
  }
)
</script>

<template>
  <div class="bank" :class="{ 'is-increasing': isIncreasing }">
    <HandCoin :class="{ 'is-spinning': isIncreasing }" />
    <small>&times;</small>
    <span class="number">{{ bank }}</span>
  </div>
</template>

<style lang="scss" scoped>
.bank {
  background: var(--card-front-color);
  height: 4rem;
  display: flex;
  padding: 1rem;
  margin: 0 0.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  transition: var(--tran-02);
  color: var(--bank-text-color);
}
.bank small {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0.25rem;
}
.bank .number {
  transition: var(--tran-02);
}
.bank.is-increasing .number {
  transform: scale(1.3);
}
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(2160deg);
  }
}
</style>
