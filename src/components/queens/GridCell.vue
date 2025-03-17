<script setup>
defineProps({
  // 格子的內容
  content: {
    type: String,
    default: null
  },
  // 格子的顏色
  color: {
    type: String,
    required: true
  },
  // 標記該位置的皇后是否有衝突
  invalid: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="cell" :class="{ invalid }" :style="{ backgroundColor: color }">
    <img v-if="content === 'queen'" src="@/assets/queens/crown.svg" class="queen" />
    <span v-if="content === 'marked'">×</span>
  </div>
</template>

<style lang="scss" scoped>
// 基本格子樣式
.cell {
  font-size: 24px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: var(--tran-03);

  // 無效（有衝突）的格子樣式
  &.invalid {
    border: 3px solid red;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    animation: shake 0.5s ease-in-out;
  }

  // 皇后圖示
  .queen {
    width: 1.5rem;
    height: 1.5rem;
  }
}

// 震動動畫
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translateX(10px);
  }
}
</style>
