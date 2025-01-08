<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
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

.game-button {
  padding: 0 1rem;
  width: 7.3rem;
  height: 4rem;
  margin: 0 0.3rem;
  border-radius: 1rem;
  font-family: 'Bangers', cursive;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #333;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  box-shadow: 0 0.25rem 0 0 rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(.is-disabled) {
    &:hover {
      box-shadow: 0 0.375rem 0 0 rgba(0, 0, 0, 0.25);
      animation: pulse 1s infinite;
    }

    &:active {
      box-shadow: 0 0.125rem 0 0 rgba(0, 0, 0, 0.25);
    }
  }
}

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
