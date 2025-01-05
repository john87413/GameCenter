<script setup>
import { useRouter } from 'vue-router'
import { gameIntros } from '@/lib/GameIntros'

const router = useRouter()

const playGame = (game) => {
  router.push({ name: game.routeName })
}
</script>

<template>
  <div class="game-container">
    <h1 class="header">Games On</h1>
    <div class="game-card-container">
      <div class="game-card" v-for="game in gameIntros" :key="game.id" @click="playGame(game)">
        <img :src="game.cover" :alt="game.title" class="game-image" />
        <div class="game-info">
          <div class="game-title">{{ game.title }}</div>
          <div class="game-description">{{ game.shortDesciption }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.game-card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.game-card {
  background-color: var(--primary-color-light);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  height: 19rem;
  width: 18rem;
  margin: 0 1rem 2rem 1rem;
}

.game-card:hover {
  transform: scale(1.03);
}

.game-image {
  width: 100%;
  height: 10rem;
  object-fit: cover;
}

.game-info {
  padding: 0 10px;
}

.game-title {
  font-size: 1.2em;
  font-weight: 500;
  color: var(--primary-color);
}

.game-description {
  font-size: 0.9em;
  color: var(--text-color);
}
</style>
