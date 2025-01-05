<script setup>
import { computed } from 'vue'
import { useBlackjackStore } from '@/stores'
import calculateScore from '@/lib/blackjack/calculateScore.js'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const store = useBlackjackStore()

const total = computed(() => {
  const hand = store.hands[props.index]
  if (hand.cards.length < 2) return
  if (hand.cards.find((card) => card.isFaceDown)) return
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
.bust {
  background: #e04030;
}
.twenty-one {
  background: #e1ae0f;
}
.pop-enter-active {
  transition: var(--tran-03);
}
.pop-leave-active {
  transition: var(--tran-02);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0) rotate(360deg);
}
</style>
