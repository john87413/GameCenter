<script setup>
import { computed } from 'vue'

import HandCoin from '@/components/blackjack/hand/HandCoin.vue'

import { results } from '@/utils/blackjack/data/result'

// 遊戲結果
const { PUSH, BUST, BLACKJACK, WIN, LOSE } = results

// props
const props = defineProps({
  // 手牌 (包含下注資料)
  hand: {
    type: Object,
    required: true
  }
})

// 判斷是否輸牌
const isLoss = computed(() => {
  return [LOSE, BUST].includes(props.hand.result)
})

// 判斷是否獲勝
const isWin = computed(() => {
  return [PUSH, WIN, BLACKJACK].includes(props.hand.result)
})
</script>

<template>
  <transition-group
    name="coin"
    tag="div"
    class="hand-bet"
    :class="{ 'is-win': isWin, 'is-loss': isLoss }"
  >
    <HandCoin v-for="(bet, i) in hand.bets" :key="i" class="hand-coin" />
  </transition-group>
</template>

<style lang="scss" scoped>
// 籌碼容器樣式
.hand-bet {
  position: absolute;
  width: 100%;
  text-align: center;

  // 籌碼樣式
  .hand-coin {
    margin: 0.1rem;
    transition: var(--tran-03);
  }
}
// 輸牌時的離開動畫
// 贏牌的進入動畫
.coin-leave-to,
.is-win .coin-enter-from {
  transform: translateY(-50vh);
  opacity: 0;
}
// 下注時的動畫
// 贏牌的離開動畫
.coin-enter-from,
.is-win .coin-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
