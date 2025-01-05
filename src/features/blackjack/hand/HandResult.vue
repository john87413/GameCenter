<script setup>
import { computed } from 'vue'
import ResultBlackjack from '@/features/blackjack/result/ResultBlackjack.vue'
import ResultBust from '@/features/blackjack/result/ResultBust.vue'
import ResultLose from '@/features/blackjack/result/ResultLose.vue'
import ResultPush from '@/features/blackjack/result/ResultPush.vue'
import ResultWin from '@/features/blackjack/result/ResultWin.vue'

const props = defineProps({
  result: {
    type: String,
    required: false
  }
})

const componentsMap = {
  BUST: ResultBust,
  WIN: ResultWin,
  LOSE: ResultLose,
  PUSH: ResultPush,
  BLACKJACK: ResultBlackjack
}

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

<style scoped>
.hand-result {
  position: absolute;
  width: 13rem;
  top: 1rem;
  left: calc(50% - 6.5rem);
  text-align: center;
}
.hand-result svg {
  width: 13rem;
}
.balloon-enter-active {
  animation: balloon-in ease-in-out 0.6s;
  transform-origin: 50% 100%;
}
.balloon-leave-active {
  transition: var(--tran-02);
  transform-origin: 50% 100%;
}
.balloon-leave-to {
  transform: scale(0);
  opacity: 0;
}
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
