import { AccessibilitySharp, LogOutSharp, SettingsSharp } from '@vicons/ionicons5'
import type { VNodeChild } from '@vue/runtime-core'
import { NIcon } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import type { Component } from 'vue'
import { darkTheme } from '~/config/dark-theme'
import type { LayoutTheme } from '~/config/layout-theme'
// import { layoutThemeConfig } from '~/config/layout-theme'
import type { ThemeType } from '~/config/theme'
import { colors, darkColors } from '~/config/theme'

export const useAppStore = defineStore('app', () => {
  // const defaultTheme = import.meta.env.DEV ? layoutThemeConfig : useLayoutTheme()
  const defaultTheme = useLayoutTheme()
  const layout = reactive(unref(defaultTheme))
  const visible = ref(false)
  const { t } = useI18n()

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
  const renderIcon = (icon: Component): VNodeChild => h(NIcon, null, {
    default: () => h(icon),
  })
  const localeOptions = ref<DropdownOption[]>([
    {
      label: '简体中文',
      key: 'zh-CN',
      icon: () => '🇨🇳',
    },
    {
      label: 'English',
      key: 'en-US',
      icon: () => '🇺🇸',
    },
  ])
  const userOptions = ref<DropdownOption[]>([
    {
      label: () => t('global.layout.header.right.user.center'),
      key: 'user-center',
      icon: () => renderIcon(AccessibilitySharp),
    },
    {
      label: () => t('global.layout.header.right.user.setting'),
      key: 'user-setting',
      icon: () => renderIcon(SettingsSharp),
    },
    {
      key: 'header-divider',
      type: 'divider',
    },
    {
      label: () => t('global.layout.header.right.logout'),
      icon: () => renderIcon(LogOutSharp),
      key: 'logout',
    },
  ])
  return {
    layout,
    visible,
    userOptions,
    toggleVisible,
    toggleCollapsed,
    layoutTheme,
    updateLayoutStyle,
    overrideTheme,
    updateTheme,
    themeList,
    localeOptions,
  }
})
