import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        showSidebar: true,
        darkMode: false,
        isDimmed: false
    }),
    actions: {
        toggleSidebar(isShow) {
            this.showSidebar = isShow === undefined ? !this.showSidebar : isShow
        },
        toggleDarkMode(isDark) {
            this.darkMode = isDark === undefined ? !this.darkMode : isDark
        },
        toggleDimmed(isDimmed) {
            this.isDimmed = isDimmed === undefined ? !this.isDimmed : isDimmed
        }
    }
})