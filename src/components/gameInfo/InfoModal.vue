<script setup>
import { computed } from 'vue'
import { useModalStore } from '@/stores'

const modalStore = useModalStore()

const showModal = computed(() => modalStore.showModal)
const isStartGame = computed(() => modalStore.isStartGame)

const toggleModal = () => {
  modalStore.toggleModal()
}

const startGame = () => {
  modalStore.startGame()
}

defineProps({
  gameIntro: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <img :src="gameIntro.icon" alt="game icon" />
        <p>{{ gameIntro.title }}</p>
      </div>
      <!-- Modal Content -->
      <div class="modal-content">
        <p class="modal-subtitle">Gameplay</p>
        <ul>
          <li v-for="(gameplay, index) in gameIntro.modalGameplays" :key="index">{{ gameplay }}</li>
        </ul>
        <p class="modal-subtitle">Rules</p>
        <ul>
          <li v-for="(rule, index) in gameIntro.modalGameRules" :key="index">{{ rule }}</li>
        </ul>
      </div>
      <!-- Modal Footer -->
      <div class="modal-footer">
        <button class="action-button" @click="isStartGame ? toggleModal() : startGame()">
          {{ isStartGame ? 'Close' : 'Start Game' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
}

.modal {
  background: var(--sidebar-color);
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 50rem;
  max-height: 80vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .modal-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;

    img {
      width: 2.2rem;
    }

    p {
      margin-left: 0.5rem;
      font-size: 1.8rem;
      font-weight: 500;
      color: var(--primary-color);
    }
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
    color: #333;

    .modal-subtitle {
      font-size: 1.2rem;
      font-weight: 500;
      margin: 1rem 0 0.5rem;
      color: var(--primary-color);

      &:first-child {
        margin-top: 0;
      }
    }

    li {
      list-style: decimal;
      margin: 0 0 0.5rem 2rem;
      color: var(--text-color);
    }
  }

  .modal-footer {
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  .action-button {
    background: var(--primary-color);
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}
</style>
