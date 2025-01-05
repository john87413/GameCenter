<script setup>
import GameButton from '@/components/GameButton.vue'
</script>

<template>
  <div class="game-over">
    <GameButton action="restart" :is-enabled="true" />
  </div>
</template>

<style scoped>
.game-over {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
