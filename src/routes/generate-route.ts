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
      redirect: menuItem.redirect,
      component: getComponent(menuItem.component),
      meta: {
        title: menuItem.title,
        icon: menuItem.icon,
        id: menuItem.id,
        pid: menuItem.pid ?? undefined,
        keepAlive: menuItem.keepAlive,
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
    // {
    //   id: 1,
    //   pid: null,
    //   path: '/',
    //   name: 'Dashboard',
    //   component: 'RouteView',
    //   redirect: '/dashboard/analysis',
    //   title: 'pages.dashboard.title',
    //   icon: 'Speedometer',
    //   keepAlive: true,
    // },
    {
      id: 2,
      pid: null,
      path: '/dashboard/analysis',
      name: 'analysis',
      component: 'DashboardAnalysis',
      title: 'pages.dashboard.title',
      icon: 'Speedometer',
      keepAlive: true,
    },
    {
      id: 3,
      pid: null,
      path: '/website',
      name: 'site',
      component: 'RouteView',
      redirect: '/website/website',
      title: 'pages.site.title',
      icon: 'LogoChrome',
      keepAlive: true,
    }, {
      id: 4,
      pid: 3,
      path: '/website/mydata',
      name: 'mydata',
      component: 'MyData',
      title: 'pages.site.mydata.title',
      icon: 'PlanetSharp',
      keepAlive: true,
    },
    {
      id: 19,
      pid: 3,
      path: '/website/mysite',
      name: 'mysite',
      component: 'MySite',
      title: 'pages.site.mysite.title',
      icon: 'AtCircleSharp',
      keepAlive: true,
    },
    {
      id: 18,
      pid: 3,
      path: '/website/website',
      name: 'website',
      component: 'Website',
      title: 'pages.site.website.title',
      icon: 'AtCircleSharp',
      keepAlive: true,
    },
    {
      id: 5,
      pid: 3,
      path: '/website/torrent',
      name: 'torrent',
      component: 'WebsiteTorrents',
      title: 'pages.site.torrent.title',
      icon: 'MagnetSharp',
      keepAlive: true,
    },
    {
      id: 6,
      pid: null,
      path: '/download',
      name: 'download',
      component: 'RouteView',
      redirect: '/download/downloader',
      title: 'pages.download.title',
      icon: 'CloudDownloadSharp',
      keepAlive: true,
    },
    {
      id: 7,
      pid: 6,
      path: '/download/downloader',
      name: 'downloader',
      component: 'Downloader',
      title: 'pages.download.downloader.title',
      icon: 'LogoMarkdown',
      keepAlive: true,
    },
    {
      id: 8,
      pid: 6,
      path: '/download/repeat',
      name: 'repeat',
      component: 'DownloadRepeat',
      title: 'pages.download.repeat.title',
      icon: 'Copy',
      keepAlive: true,
    },
    {
      id: 9,
      pid: 6,
      path: '/download/brush',
      name: 'brush',
      component: 'DownloadBrush',
      title: 'pages.download.brush.title',
      icon: 'BrushSharp',
      keepAlive: true,
    },
    {
      id: 10,
      pid: null,
      path: '/tasks',
      name: 'tasks',
      component: 'Tasks',
      title: 'pages.tasks.title',
      icon: 'DocumentTextSharp',
      keepAlive: true,
    },
    {
      id: 11,
      pid: null,
      path: '/settings',
      name: 'settings',
      component: 'RouteView',
      redirect: '/settings/system',
      title: 'pages.settings.title',
      icon: 'SettingsSharp',
      keepAlive: true,
    },
    {
      id: 12,
      pid: 11,
      path: '/settings/system',
      name: 'system',
      component: 'SystemSetting',
      title: 'pages.settings.system.title',
      icon: 'CogSharp',
      keepAlive: true,
    },
    {
      id: 13,
      pid: 11,
      path: '/settings/hosts',
      name: 'hosts',
      component: 'HostsSetting',
      title: 'pages.settings.hosts.title',
      icon: 'LogoWebComponent',
      keepAlive: true,
    },
    // {
    //   id: 13,
    //   pid: 11,
    //   path: '/settings/supervisor',
    //   name: 'supervisor',
    //   component: 'SupervisorSetting',
    //   title: 'pages.settings.supervisor.title',
    //   icon: 'Apps',
    //   keepAlive: true,
    // },
    {
      id: 18,
      pid: 11,
      path: '/settings/flower',
      name: 'flower',
      component: 'FlowerSetting',
      title: 'pages.settings.flower.title',
      icon: 'Apps',
      keepAlive: true,
    },
    {
      id: 14,
      pid: null,
      path: '/tools',
      name: 'tools',
      component: 'RouteView',
      redirect: '/tools/logs',
      title: 'pages.tools.title',
      icon: 'Construct',
      keepAlive: true,
    },
    {
      id: 15,
      pid: 14,
      path: '/tools/logs',
      name: 'logs',
      component: 'LogsTool',
      title: 'pages.tools.logs.title',
      icon: 'ListSharp',
      keepAlive: true,
    },
    {
      id: 16,
      pid: 14,
      path: '/tools/shell',
      name: 'shell',
      component: 'ShellTool',
      title: 'pages.tools.shell.title',
      icon: 'CodeSlashSharp',
      keepAlive: true,
    },
    {
      id: 17,
      pid: 14,
      path: '/tools/import',
      name: 'import',
      component: 'ImportTool',
      title: 'pages.tools.import.title',
      icon: 'LogInSharp',
      keepAlive: true,
    },
    {
      id: 99,
      pid: null,
      path: '/help',
      name: 'help',
      component: 'RouteView',
      redirect: '/help',
      title: 'pages.help.title',
      icon: 'HelpCircleSharp',
      keepAlive: true,
    },
    {
      id: 100,
      pid: 99,
      path: '/help/docs',
      name: 'docs',
      component: 'Docs',
      title: 'pages.help.docs.title',
      icon: 'Document',
      keepAlive: true,
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
