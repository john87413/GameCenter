<script setup>
import { computed } from 'vue'

import { useBlackjackStore } from '@/stores'

import CardComponent from '@/components/blackjack/hand/CardComponent.vue'
import HandTotal from '@/components/blackjack/hand/HandTotal.vue'
import HandBet from '@/components/blackjack/hand/HandBet.vue'
import HandResult from '@/components/blackjack/hand/HandResult.vue'

// props
const props = defineProps({
  // 莊家或玩家的手牌數據(包含卡牌陣列、下注、結果等)
  hand: {
    type: Object,
    required: true
  },
  // 手牌索引
  index: {
    type: Number,
    required: true
  }
})

// store
const store = useBlackjackStore()

// 判斷是否為當前操作中的手牌
const isActiveHand = computed(() => store.activeHandIndex === props.index)
// 判斷是否為非當前操作中的手牌
const isInactiveHand = computed(
  () => store.isSplit && !isActiveHand.value && store.activeHandIndex && props.index > 0
)
// 生成手牌區域的 CSS 類別
const handClasses = computed(() => {
  let classes = []
  if (isActiveHand.value && props.index > 0) classes.push('is-active')
  if (store.isSplit && props.index > 0) classes.push('is-split')
  if (props.index === 0) classes.push('is-dealer')
  if (isInactiveHand.value) classes.push('is-inactive')
  return classes
})
</script>

<template>
  <div class="game-hand" :class="handClasses">
    <transition-group name="deal" tag="div" class="cards">
      <CardComponent
        v-for="(card, i) in hand.cards"
        :key="i"
        :card="card"
        :isFaceDown="card.isFaceDown"
      />
    </transition-group>
    <!-- 手牌點數 -->
    <HandTotal :index="index" />
    <!-- 下注籌碼 -->
    <HandBet :hand="hand" />
    <!-- 遊戲結果 -->
    <HandResult :result="hand.result" />
  </div>
</template>

<style lang="scss" scoped>
// 手牌區域基本樣式
.game-hand {
  position: relative;
  transition: transform 0.2s ease;
}
// 莊家和分牌後的手牌樣式
.game-hand.is-dealer,
.game-hand.is-split {
  transform: scale(0.9);
}
// 當前操作中的手牌樣式
.game-hand.is-active,
.game-hand.is-split.is-active {
  transform: scale(1.3);
}
// 非操作中手牌的樣式
.game-hand.is-inactive {
  opacity: 0.5;
}
// 卡牌容器樣式
.cards {
  min-height: 6.2rem;
  min-width: 4.2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
// 發牌與離開動畫
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
