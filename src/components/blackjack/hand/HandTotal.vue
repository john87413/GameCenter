<script setup>
import { computed } from 'vue'

import { useBlackjackStore } from '@/stores'

import calculateScore from '@/utils/blackjack/calculateScore.js'

// props
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

// store
const store = useBlackjackStore()

// 計算手牌總點數
const total = computed(() => {
  const hand = store.hands[props.index]
  if (hand.cards.length < 2) return // 手牌至少有兩張牌才能計算
  if (hand.cards.find((card) => card.isFaceDown)) return // 沒有面朝下的牌（莊家）才能計算
  return calculateScore.score(hand.cards)
})
</script>

<template>
  <transition name="pop">
    <span v-if="total" class="hand-total" :class="{ bust: total > 21, 'twenty-one': total === 21 }">
      {{ total }}
    </span>
  </transition>
</template>

<style lang="scss" scoped>
// 點數基本樣式
.hand-total {
  display: inline-block;
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 2em;
  background: var(--primary-color);
  border-radius: 50%;
  text-align: center;
  color: var(--menu-text-color);
}
// 爆牌顏色
.bust {
  background: #e04030;
}
// 21點顏色
.twenty-one {
  background: #e1ae0f;
}
// 進入&離開過渡
.pop-enter-active,
.pop-leave-active {
  transition: var(--tran-03);
}
// 動畫樣式
.pop-enter-from,
.pop-leave-to {
  transform: scale(0) rotate(360deg);
}
</style>
