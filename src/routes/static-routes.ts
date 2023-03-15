import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '~/layouts'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('~/pages/index.vue'),
        name: 'index',
      },
      {
        path: '/workspace',
        component: () => import('~/pages/workspace/index.vue'),
        name: 'workspace',
      },
    ],

  },

]

export default staticRoutes
