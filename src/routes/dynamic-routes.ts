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
export const dynamicRoutes: RouteRecordRaw[] = []
