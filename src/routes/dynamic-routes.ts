import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '~/layouts'

/**
 * 根路由信息
  */
export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/dashboard/analysis',
  component: Layout,
  children: [],
}
export const dynamicRoutes: RouteRecordRaw[] = [{
  path: '/',
  name: 'default-router',
  redirect: '/dashboard/analysis',
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/analysis.vue'),
      meta: {
        id: 0,
        title: 'dashboard',
        icon: 'dashboard',
      },
    },

  ],
}]
