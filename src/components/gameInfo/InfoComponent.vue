<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { gameIntros } from '@/lib/GameIntros'
import { useModalStore } from '@/stores'

import InfoModal from '@/components/gameInfo/InfoModal.vue'

const route = useRoute()
const showDialog = ref(false)
let dialogTimeout = null

const gameIntro = computed(() => {
  return (
    gameIntros.find((game) => game.routeName === route.name) || {
      title: '',
      shortDesciption: '',
      modalGameplays: [],
      modalGameRules: []
    }
  )
})

const modalStore = useModalStore()

const toggleModal = () => {
  modalStore.toggleModal()
}

const onButtonEnter = () => {
  clearTimeout(dialogTimeout)
  showDialog.value = true
}

const onButtonLeave = () => {
  dialogTimeout = setTimeout(() => {
    showDialog.value = false
  }, 300)
}

const onDialogEnter = () => {
  clearTimeout(dialogTimeout)
}

const onDialogLeave = () => {
  dialogTimeout = setTimeout(() => {
    showDialog.value = false
  }, 300)
}
</script>

<template>
  <div class="game-info-wrapper" v-if="gameIntro.title != ''">
    <!-- Info Button and Hoverable Dialog -->
    <button
      class="info-button"
      @mouseenter="onButtonEnter"
      @mouseleave="onButtonLeave"
      @click="toggleModal"
    >
      <p class="info-icon">?</p>
    </button>
    <Transition name="dialog">
      <div
        v-show="showDialog"
        class="info-dialog"
        @mouseenter="onDialogEnter"
        @mouseleave="onDialogLeave"
      >
        <h3>{{ gameIntro.title }}</h3>
        <p>{{ gameIntro.shortDesciption }}</p>
        <!-- Trigger Modal -->
        <button class="more-info-button" @click="toggleModal">More Info</button>
      </div>
    </Transition>

    <!-- Modal -->
    <InfoModal :gameIntro="gameIntro"></InfoModal>
  </div>
</template>

<style lang="scss" scoped>
.game-info-wrapper {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .info-button {
    background: var(--primary-color);
    opacity: 0.8;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    margin-bottom: 1rem;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .info-icon {
      color: #fff;
      font-size: 1.5rem;
    }
  }

  .dialog-enter-active,
  .dialog-leave-active {
    transition: opacity 0.5s;
  }

  .dialog-enter-from,
  .dialog-leave-to {
    opacity: 0;
  }

  .dialog-enter-to,
  .dialog-leave-from {
    opacity: 1;
  }

  .info-dialog {
    background: var(--sidebar-color);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    width: 18rem;
    max-width: 90vw;
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.5;

    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: var(--primary-color);
    }

    p {
      margin: 0;
    }

    .more-info-button {
      background: var(--primary-color);
      color: #fff;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
      transition: background-color 0.3s ease;
    }
  }
}
</style>
