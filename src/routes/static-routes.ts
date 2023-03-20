import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: RouteRecordRaw[] = [
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
]

export default staticRoutes
