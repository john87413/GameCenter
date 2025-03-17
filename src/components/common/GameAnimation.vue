<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const showAnimation = ref(false)
const isAnimationComplete = ref(false)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await router.isReady()
  if (route.name === 'home') {
    showAnimation.value = true
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      showAnimation.value = false
    }, 4000)
  }
})

const onTransitionEnd = () => {
  if (!showAnimation.value) {
    isAnimationComplete.value = true
    document.body.style.overflow = 'auto'
  }
}
</script>

<template>
  <Transition name="fade" :duration="{ enter: 0, leave: 1000 }" @after-leave="onTransitionEnd">
    <div class="opening-animation" v-show="showAnimation && !isAnimationComplete">
      <div class="animation-container">
        <div class="game-elements">
          <div class="element dice"></div>
          <div class="element card"></div>
          <div class="element chip"></div>
        </div>
        <div class="logo-container">
          <h1 class="game-on">
            <span>G</span><span>a</span><span>m</span><span>e</span> <span>O</span><span>n</span>
          </h1>
          <h2 class="fun-never-ends">Fun Never Ends</h2>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.opening-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  z-index: 9999;
  overflow: hidden;

  .animation-container {
    position: relative;
    text-align: center;

    .game-elements {
      position: absolute;
      width: 100%;
      height: 100%;

      .element {
        position: absolute;
        opacity: 0;
        animation:
          floatElement 3s ease-in-out infinite,
          fadeInOut 6s ease-in-out;
      }

      .dice {
        top: -50px;
        left: 20%;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 10px;
        animation-delay: 0.3s;
      }

      .card {
        top: 50px;
        right: 20%;
        width: 30px;
        height: 45px;
        background-color: var(--bank-text-color);
        border-radius: 5px;
        animation-delay: 0.6s;
      }

      .chip {
        bottom: -30px;
        left: 50%;
        width: 35px;
        height: 35px;
        background-color: var(--card-back-color);
        border-radius: 50%;
        animation-delay: 0.9s;
      }
    }

    .logo-container {
      position: relative;
      z-index: 1;

      .game-on {
        font-size: 4rem;
        color: var(--sidebar-color);
      }

      .game-on span {
        display: inline-block;
        opacity: 0;
        transform: scale(0);
        animation: popIn 0.5s ease-out forwards;
      }

      .game-on span:nth-child(1) {
        animation-delay: 0.15s;
      }
      .game-on span:nth-child(2) {
        animation-delay: 0.25s;
      }
      .game-on span:nth-child(3) {
        animation-delay: 0.35s;
      }
      .game-on span:nth-child(4) {
        animation-delay: 0.45s;
      }
      .game-on span:nth-child(5) {
        animation-delay: 0.55s;
      }
      .game-on span:nth-child(6) {
        animation-delay: 0.65s;
      }

      .fun-never-ends {
        font-size: 2rem;
        color: var(--primary-color-light);
        opacity: 0;
        animation: slideIn 1s ease-out 0.8s forwards;
      }
    }
  }
}

// 只保留離開動畫
.fade-leave-active {
  transition: all 1s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

@keyframes floatElement {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.element.exit {
  animation: exitAnimation 0.5s forwards;
}

@keyframes exitAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100%) scale(1.5);
    opacity: 0;
  }
}
</style>
