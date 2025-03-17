<script setup>
import { computed } from 'vue'
import { useQueensStore } from '@/stores'

// store
const queensStore = useQueensStore()

/**
 * 格式化時間顯示
 * EX: 125秒 -> "02:05"
 */
const formattedTime = computed(() => queensStore.formattedTime)
</script>

<template>
  <div class="timer">⏱ {{ formattedTime }}</div>
</template>

<style lang="scss" scoped>
/* 計時器容器樣式 */
.timer {
  background: var(--card-front-color);
  height: 4rem;
  display: flex;
  margin: 0 0.3rem;
  padding: 1rem;
  align-items: center;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--bank-text-color);
}
</style>
