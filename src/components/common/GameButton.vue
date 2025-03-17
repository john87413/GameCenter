<script setup>
defineProps({
  // 按鈕顯示的文字內容
  text: {
    type: String,
    required: true
  },
  // 控制按鈕是否可用
  isEnabled: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <button class="game-button" :class="{ 'is-disabled': !isEnabled }" :disabled="!isEnabled">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

/* 基本按鈕樣式 */
.game-button {
  width: 7.3rem;
  margin: 0 0.3rem;
  border-radius: 1rem;
  font-family: 'Bangers', cursive;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #333;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  box-shadow: 0 0.25rem 0 0 rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  // 禁用狀態樣式
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  // 啟用狀態的互動效果
  &:not(.is-disabled) {
    // 懸停效果
    &:hover {
      box-shadow: 0 0.375rem 0 0 rgba(0, 0, 0, 0.25);
      animation: pulse 1s infinite;
    }

    // 點擊效果
    &:active {
      box-shadow: 0 0.125rem 0 0 rgba(0, 0, 0, 0.25);
    }
  }
}

// 動畫效果
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
