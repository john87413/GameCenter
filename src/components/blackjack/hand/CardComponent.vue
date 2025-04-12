<script setup>
import CardValue from '@/components/blackjack/hand/CardValue.vue'
import CardSuit from '@/components/blackjack/hand/CardSuit.vue'

// props
defineProps({
  // 卡牌，包含花色(suit)和點數(value)
  card: {
    type: Object,
    required: true
  },
  // 控制卡牌是否面朝下
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
    <div class="back"></div>
  </div>
</template>

<style lang="scss" scoped>
// 卡牌基本樣式
.card {
  position: relative;
  width: 4rem;
  height: 6rem;
  margin: 0.1rem;
  transition: var(--tran-02);
}
// 卡牌正面和背面的共同樣式
.card .front,
.card .back {
  border-radius: 0.4rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
// 卡牌正面樣式
.card .front {
  background-image: url('@/assets/blackjack/card-front.svg');
  background-color: var(--card-front-color);
}
// 卡牌背面樣式
.card .back {
  background-image: url('@/assets/blackjack/card-back.svg');
  transform: rotateY(-180deg);
  background-color: var(--card-back-color);
}
// 背面轉到正面
.card.face-down .back {
  transform: rotateY(0deg);
}
// 正面轉到背面
.card.face-down .front {
  transform: rotateY(180deg);
}
// 左上角點數和花色的容器樣式
.card .top-corner {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 1.5rem;
}
</style>
