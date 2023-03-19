import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '~/routes/static-routes'

const router = createRouter({
  routes: [
    ...staticRoutes,
    {
      path: '/login',
      component: () => import('~/pages/login/index.vue'),
      name: 'login',
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('~/pages/error/index.vue'),
    },
  ],
  history: createWebHistory(import.meta.env.VITE_APP_BASE ?? '/'),
})

export default router
