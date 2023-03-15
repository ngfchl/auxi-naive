import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [],
  history: createWebHistory(import.meta.env.VITE_APP_BASE ?? '/'),
})

export default router
