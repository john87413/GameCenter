<script setup>
import { computed } from 'vue'

import { results } from '@/utils/blackjack/data/result'

import ResultBlackjack from '@/components/blackjack/result/ResultBlackjack.vue'
import ResultBust from '@/components/blackjack/result/ResultBust.vue'
import ResultLose from '@/components/blackjack/result/ResultLose.vue'
import ResultPush from '@/components/blackjack/result/ResultPush.vue'
import ResultWin from '@/components/blackjack/result/ResultWin.vue'

// props
const props = defineProps({
  // 遊戲結果的數字值
  result: {
    type: Number,
    required: false
  }
})

// 使用計算屬性名語法，將 results 中的數值作為 key，對應的組件作為 value
const componentsMap = {
  [results.BUST]: ResultBust,
  [results.WIN]: ResultWin,
  [results.LOSE]: ResultLose,
  [results.PUSH]: ResultPush,
  [results.BLACKJACK]: ResultBlackjack
}

// 根據結果值獲取對應的結果組件
const getResultComponent = computed(() => {
  return props.result ? componentsMap[props.result] : null
})
</script>

<template>
  <transition name="balloon">
    <div v-if="result" class="hand-result">
      <component :is="getResultComponent"></component>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
// 結果容器樣式
.hand-result {
  position: absolute;
  width: 13rem;
  top: 1rem;
  left: calc(50% - 6.5rem);
}
// 動畫進入過程中
.balloon-enter-active {
  animation: balloon-in ease-in-out 0.6s;
  transform-origin: 50% 100%;
}
// 動畫離開過程中
.balloon-leave-active {
  transition: var(--tran-03);
}
// 動畫離開後的狀態
.balloon-leave-to {
  transform: scale(0);
  opacity: 0;
}
// 動畫效果
@keyframes balloon-in {
  0% {
    transform: scale(0) skewX(0deg) rotate(-20deg);
  }
  40% {
    transform: scale(1) skewX(-5deg) rotate(10deg);
  }
  50% {
    transform: skewX(5deg) rotate(-5deg);
  }
  60% {
    transform: skewX(-4deg) rotate(3deg);
  }
  70% {
    transform: skewX(4deg) rotate(-1deg);
  }
  80% {
    transform: skewX(-3deg) rotate(0deg);
  }
  85% {
    transform: skewX(3deg);
  }
  90% {
    transform: skewX(-2deg);
  }
  95% {
    transform: skewX(2deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
</style>
