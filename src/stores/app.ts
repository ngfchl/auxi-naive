import { darkTheme } from '~/config/dark-theme'
import type { LayoutTheme } from '~/config/layout-theme'
import { layoutThemeConfig } from '~/config/layout-theme'
import type { ThemeType } from '~/config/theme'
import { colors, darkColors } from '~/config/theme'

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
  watch(() => layout.layoutStyle, (value) => {
    if (value === 'dark')
      toggleDark(true)
    else
      toggleDark(false)
  })
  const overrideTheme = computed(() => {
    if (isDark.value)
      return darkColors[layout.theme]
    return colors[layout.theme]
  })
  const updateTheme = (theme: string) => {
    layout.theme = theme
  }

  const themeList = computed<ThemeType[]>(() => {
    const list: ThemeType[] = []
    const myColors = isDark.value ? darkColors : colors
    for (const colorsKey in myColors) {
      const value = myColors[colorsKey]
      list.push({
        color: value.common?.primaryColor as string,
        key: colorsKey,
      })
    }
    return list
  })
  return {
    layout,
    visible,
    toggleVisible,
    toggleCollapsed,
    layoutTheme,
    updateLayoutStyle,
    overrideTheme,
    updateTheme,
    themeList,
  }
})
