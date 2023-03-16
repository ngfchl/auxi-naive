import { layoutThemeConfig } from '~/config/layout-theme'

export const useAppStore = defineStore('app', () => {
  const defaultTheme = import.meta.env.DEV ? layoutThemeConfig : useLayoutTheme()
  const layout = reactive(unref(defaultTheme))
  const visible = ref(false)
  const toggleVisible = (value: boolean) => {
    visible.value = value
  }
  const toggleCollapsed = (value: boolean) => {
    layout.collapsed = value
  }
  return {
    layout, visible, toggleVisible, toggleCollapsed,
  }
})
