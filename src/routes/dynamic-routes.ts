import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '~/layouts'

/**
 * 根路由信息
  */
export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/home',
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
        component: () => import('~/pages/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/workspace',
        name: 'workspace',
        component: () => import('~/pages/workspace/index.vue'),
      },
    ],

  },
]
