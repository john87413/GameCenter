<script setup>
import { computed } from 'vue'
import { useQueensStore } from '@/stores'

const queensStore = useQueensStore()

const formattedTime = computed(() => queensStore.formattedTime)
</script>

<template>
  <div class="timer">⏱ {{ formattedTime }}</div>
</template>

<style lang="scss" scoped>
.timer {
  background: var(--card-front-color);
  height: 4rem;
  display: flex;
  margin: 0 0.3rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  transition: var(--tran-02);
  color: var(--bank-text-color);
}
</style>
