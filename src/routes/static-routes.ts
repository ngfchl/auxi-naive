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
  {
    path: '/redirect/:path(.*)',
    name: 'redirect',
    component: () => import('~/pages/redirect/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('~/pages/error/error.vue'),
  },
]

export default staticRoutes
