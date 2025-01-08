<script setup>
import { computed } from 'vue'
import HandCoin from '@/components/blackjack/hand/HandCoin.vue'
import { results } from '@/utils/blackjack/data/result'

const { PUSH, BUST, BLACKJACK, WIN, LOSE } = results

const props = defineProps({
  hand: {
    type: Object,
    required: true
  }
})

const isLoss = computed(() => {
  return [LOSE, BUST].includes(props.hand.result)
})

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

<style scoped>
.hand-bet {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
}
.hand-bet .hand-coin {
  margin: 0.1rem;
  transition: var(--tran-03);
}
.coin-leave-to,
.is-win .coin-enter-from {
  transform: translateY(-50vh);
  opacity: 0;
}
.coin-enter-from,
.is-win .coin-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
