import { layoutThemeConfig } from '~/config/layout-theme'

export const useLayoutTheme = createGlobalState(
  () => useLocalStorage('layout-theme', layoutThemeConfig),
)
