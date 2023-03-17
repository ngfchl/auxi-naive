import { darkTheme } from 'naive-ui'
import type { LayoutTheme } from '~/config/layout-theme'
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
  const updateLayoutStyle = (value: LayoutTheme['layoutStyle']) => {
    layout.layoutStyle = value
  }
  const layoutTheme = computed(() => {
    if (layout.layoutStyle === 'dark') return darkTheme
    return undefined
  })

  return {
    layout, visible, toggleVisible, toggleCollapsed, layoutTheme, updateLayoutStyle,
  }
})
