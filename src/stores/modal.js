import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        showModal: false,
        isStartGame: false
    }),
    actions: {
        toggleModal(isShow) {
            this.showModal = isShow === undefined ? !this.showModal : isShow
        },
        beforeGame() {
            this.showModal = true
            this.isStartGame = false
        },
        startGame() {
            this.isStartGame = true
            this.showModal = false
        }
    }
})