import { reactive } from 'vue'
import { layoutThemeConfig } from '~/config/layout-theme'
export const useAppStore = defineStore('app', () => {
  const layout = reactive(layoutThemeConfig)

  return {
    layout,
  }
})
