import type { RouteRecordRaw } from 'vue-router'
import modules from './modules'
import type { MenuInfo } from '~/api/user'
import { rootRouter } from '~/routes/dynamic-routes'

const defaultRoutes: Record<string, any> = {
  RouteView: () => import('~/layouts/base-layout/route-view.vue'),
  BlankView: () => import('~/layouts/base-layout/blank-view.vue'),
}

const getComponent = (component?: string) => {
  if (!component)
    return defaultRoutes.BlankView
  if (component in defaultRoutes)
    return defaultRoutes[component]

  return (modules as Record<string, any>)[component]
}
/**
 * 数组生成菜单
 * @param menuInfo
 * @param pid
 */
const generator = (menuInfo: MenuInfo[], pid?: number | string): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = []
  let currentMenus: MenuInfo[]
  if (!pid)
    currentMenus = menuInfo.filter(item => !item.pid)
  else
    currentMenus = menuInfo.filter(item => item.pid === pid)

  for (const menuItem of currentMenus) {
    const currentRoute: RouteRecordRaw = {
      path: menuItem.path,
      name: menuItem.name,
      component: getComponent(menuItem.component),
      meta: {
        title: menuItem.title,
        icon: menuItem.icon,
        id: menuItem.id,
        pid: menuItem.pid,
      },
      children: generator(menuInfo, menuItem.id),
    }
    if (!currentRoute.children || currentRoute.children.length === 0)
      delete (currentRoute as RouteRecordRaw).children
    routes.push(currentRoute)
  }
  return routes
}

export const generateRoute = async () => {
  // const { data } = await userRoutesApi()
  const data: MenuInfo[] = [
    {
      id: 1,
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: 'RouteView',
      title: '工作区',
      icon: 'AppstoreOutlined',

    },
    {
      id: 2,
      pid: 1,
      path: '/home',
      name: 'Home',
      component: 'Home',
      title: 'Home',
    },
    {
      id: 3,
      pid: 1,
      name: 'Workspace',
      path: '/workspace',
      component: 'Workspace',
      title: '工作台',
    },
    {
      id: 4,
      name: 'FullPath',
      path: 'https://www.baidu.com',
      component: 'BlankRoute',
      title: '跳转百度',
      icon: 'LinkOutlined',
    },
  ]
  if (data) {
    const routes = generator(data)
    return {
      ...rootRouter,
      children: routes,
    }
  }
}
