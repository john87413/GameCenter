<script setup>
import { ref, watch, computed } from 'vue'

import { useBlackjackStore } from '@/stores'

import HandCoin from '@/components/blackjack/hand/HandCoin.vue'

// store
const blackjackStore = useBlackjackStore()

// 控制贏得籌碼時的動畫效果
const isIncreasing = ref(false)

// 當前籌碼數
const bank = computed(() => blackjackStore.bank)

// 籌碼設置 (起始總籌碼、最低下注)
const { startingBank, minimumBet } = blackjackStore.settings

// 當籌碼增加時(贏得遊戲)，觸發動畫效果
watch(
  () => bank.value,
  (current, previous) => {
    // 遊戲開始時的初始下注，不觸發動畫
    if (previous === 0 && current === startingBank - minimumBet) return

    // 當籌碼增加時，觸發動畫
    if (current > previous) {
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
  width: 6.5rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 0 0.3rem;
  align-items: center;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1.4rem;
  transition: var(--tran-02);
  color: var(--bank-text-color);

  // 乘號樣式
  small {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0.25rem;
  }

  // 數字樣式
  .number {
    transition: var(--tran-02);
  }

  // 籌碼增加時的狀態
  &.is-increasing {
    .number {
      transform: scale(1.3);
    }
  }
}

// 旋轉動畫
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center center;
}

// 旋轉動畫
@keyframes spin {
  from {
    transform: rotateY(0);
  }

  to {
    transform: rotateY(2160deg);
  }
}
</style>
