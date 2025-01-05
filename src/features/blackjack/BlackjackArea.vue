<script setup>
import { computed } from 'vue'
import { useBlackjackStore } from '@/stores'
import { results } from '@/lib/blackjack/data/result'
import CardComponent from '@/features/blackjack/hand/CardComponent.vue'
import HandTotal from '@/features/blackjack/hand/HandTotal.vue'
import HandBet from '@/features/blackjack/hand/HandBet.vue'
import HandResult from '@/features/blackjack/hand/HandResult.vue'

const props = defineProps({
  hand: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const store = useBlackjackStore()

const isActiveHand = computed(() => store.activeHandIndex === props.index)
const isInactiveHand = computed(
  () => store.isSplit && !isActiveHand.value && store.activeHandIndex && props.index > 0
)
const handClasses = computed(() => {
  let classes = []
  if (isActiveHand.value && props.index > 0) classes.push('is-active')
  if (store.isSplit && props.index > 0) classes.push('is-split')
  if (props.index === 0) classes.push('is-dealer')
  if (isInactiveHand.value) classes.push('is-inactive')
  return classes
})

const toResultString = (resultValue) => {
  for (const key in results) {
    if (results[key] === resultValue) return key
  }
}
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
    <HandTotal :index="index" />
    <HandBet :hand="hand" />
    <HandResult :result="toResultString(hand.result)" />
  </div>
</template>

<style lang="scss" scoped>
.game-hand {
  position: relative;
  transition: transform 0.2s ease;
}
.game-hand.is-dealer,
.game-hand.is-split {
  transform: scale(0.9);
}
.game-hand.is-active,
.game-hand.is-split.is-active {
  max-width: 55%;
  transform: scale(1.3);
  z-index: 100;
}
.game-hand.is-split {
  transition: scale 0s;
}
.game-hand.is-inactive {
  opacity: 0.3;
  transform: translateY(-4rem);
}
.cards {
  min-height: 6.2rem;
  min-width: 4.2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
}
.is-split .deal-leave-active {
  animation-duration: 0;
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
