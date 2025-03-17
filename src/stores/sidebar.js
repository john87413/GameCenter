import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        showSidebar: true,
        darkMode: false,
        isNarrowScreen: false
    }),
    actions: {
        toggleSidebar(isShow) {
            this.showSidebar = isShow === undefined ? !this.showSidebar : isShow
        },
        toggleDarkMode(isDark) {
            this.darkMode = isDark === undefined ? !this.darkMode : isDark
        },
        toggleNarrowScreen(isNarrowScreen) {
            this.isNarrowScreen = isNarrowScreen === undefined ? !this.isNarrowScreen : isNarrowScreen
        }
    }
})