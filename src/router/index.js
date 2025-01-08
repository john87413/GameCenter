import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blackjack',
      name: 'blackjack',
      component: () => import('../views/BlackjackView.vue')
    },
    {
      path: '/queens',
      name: 'queens',
      component: () => import('../views/QueensView.vue')
    }
  ]
})

export default router
