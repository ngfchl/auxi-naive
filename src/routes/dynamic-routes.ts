import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '~/layouts'

/**
 * 根路由信息
  */
export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/dashboard',
  component: Layout,
  children: [],
}
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('~/pages/dashboard/analysis.vue'),
      },
      // {
      //   path: '/dashboard/workspace',
      //   name: 'workspace',
      //   component: () => import('~/pages/dashboard/workspace.vue'),
      // },
    ],

  },
]
