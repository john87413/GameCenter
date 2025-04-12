<script setup>
import { computed } from 'vue'
import { useBlackjackStore } from '@/stores'
import GameButton from '@/components/common/GameButton.vue'
import BlackjackBank from '@/components/blackjack/BlackjackBank.vue'

// store
const blackjackStore = useBlackjackStore()

// 是否可以分牌
const canSplit = computed(() => blackjackStore.canSplit)
// 是否可以雙倍下注
const canDoubleDown = computed(() => blackjackStore.canDoubleDown)
// 是否可以進行操作
const canPerformAction = computed(() => blackjackStore.canPerformAction)

// 加倍下注
const doubleDown = () => {
  blackjackStore.doubleDown()
}
// 分牌
const split = () => {
  blackjackStore.callSplit()
}
// 停止要牌
const stand = () => {
  blackjackStore.stand()
}
// 要牌
const hit = () => {
  blackjackStore.hit({})
}
</script>

<template>
  <div class="controls">
    <div class="button-group">
      <GameButton
        @click="doubleDown"
        text="DOUBLE DOWN"
        :is-enabled="canDoubleDown && canPerformAction"
      />
      <GameButton @click="split" text="SPLIT" :is-enabled="canSplit && canPerformAction" />
    </div>
    <BlackjackBank />
    <div class="button-group">
      <GameButton @click="stand" text="STAND" :is-enabled="canPerformAction" />
      <GameButton @click="hit" text="HIT" :is-enabled="canPerformAction" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 控制容器樣式
.controls {
  display: flex;
  margin-bottom: 1rem;
}

// 按鈕組樣式
.button-group {
  display: flex;
}

@media (max-width: 768px) {
  .controls {
    align-items: center;
    .button-group {
      flex-direction: column;
      padding: 0 0.5rem;
      .game-button {
        height: 3.5rem;
        margin: 0.3rem 0;
      }
    }
  }
}
</style>
