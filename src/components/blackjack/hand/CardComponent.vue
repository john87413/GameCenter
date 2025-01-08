<script setup>
import CardValue from '@/components/blackjack/hand/CardValue.vue'
import CardSuit from '@/components/blackjack/hand/CardSuit.vue'

defineProps({
  card: {
    type: Object,
    required: true
  },
  isFaceDown: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="card" :class="{ 'face-down': isFaceDown }">
    <div class="front">
      <div class="top-corner">
        <CardValue :value="card.value" :suit="card.suit" />
        <CardSuit :suit="card.suit" />
      </div>
    </div>
    <div class="back" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-block;
  width: 4rem;
  height: 6rem;
  margin: 0.1rem;
  transition: var(--tran-02);
}
.card .front,
.card .back {
  border-radius: 0.4rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.card .front {
  background-image: url('@/assets/blackjack/card-front.svg');
  background-color: var(--card-front-color);
}
.card .back {
  background-image: url('@/assets/blackjack/card-back.svg');
  transform: rotateY(-180deg);
  background-color: var(--card-back-color);
}
.card.face-down .back {
  transform: rotateY(0deg);
}
.card.face-down .front {
  transform: rotateY(180deg);
}
.card .top-corner {
  position: absolute;
  text-align: center;
  top: 0.5rem;
  left: 0.5rem;
  width: 1.5rem;
  height: 2.5rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: stretch;
}
</style>
