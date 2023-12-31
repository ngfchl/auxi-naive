import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import MenuTitle from '~/layouts/side-menu/menu-title.vue'

export const generateMenu = (routes: RouteRecordRaw[]) => {
  const menus: MenuOption[] = []
  for (const route of routes) {
    const currentMenu: MenuOption = {
      key: route.path,
      label: () => h(MenuTitle, { route }),
    }
    if (route?.meta?.icon)
      currentMenu.icon = () => h(MenuIcon, { icon: route?.meta?.icon })
    if (route.children && route.children.length > 0)
      currentMenu.children = generateMenu(route.children)
    menus.push(currentMenu)
  }
  return menus
}
