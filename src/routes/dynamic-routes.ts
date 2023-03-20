import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '~/layouts'

export const dynamicRoutes: RouteRecordRaw[] = [
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
