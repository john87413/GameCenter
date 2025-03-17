<script setup>
import { useRouter } from 'vue-router'

import { gameIntros } from '@/utils/GameIntros'

import GameArea from '@/components/common/GameArea.vue'

// 初始化路由實例
const router = useRouter()

// 遊戲卡片點擊事件，導航至相應的遊戲頁面
const playGame = (game) => {
  router.push({ name: game.routeName })
}
</script>

<template>
  <GameArea>
    <div class="game-container">
      <h1 class="header">Games On</h1>
      <div class="game-card-container">
        <div v-for="game in gameIntros" :key="game.id" class="game-card" @click="playGame(game)">
          <img :src="game.cover" :alt="game.title" class="game-image" />
          <div class="game-info">
            <div class="game-title">{{ game.title }}</div>
            <div class="game-description">{{ game.shortDesciption }}</div>
          </div>
        </div>
      </div>
    </div>
  </GameArea>
</template>

<style scoped>
/* 遊戲容器樣式 */
.game-container {
  padding: 1.3rem;
}

/* 頁面標題樣式 */
.header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

/* 遊戲卡片容器樣式 */
.game-card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* 遊戲卡片樣式 */
.game-card {
  background-color: var(--primary-color-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  height: 19rem;
  width: 18rem;
  margin: 0 1rem 2rem 1rem;
}

/* 卡片放大效果 */
.game-card:hover {
  transform: scale(1.03);
}

/* 遊戲封面圖片樣式 */
.game-image {
  width: 100%;
  height: 10rem;
  object-fit: cover;
}

/* 遊戲資訊區域樣式 */
.game-info {
  padding: 0 10px;
}

/* 遊戲標題樣式 */
.game-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--primary-color);
}

/* 遊戲描述文本樣式 */
.game-description {
  font-size: 0.9rem;
  color: var(--text-color);
}
</style>
