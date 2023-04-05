import logo from '~/assets/ptools.svg'
export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  layoutStyle: 'light' | 'inverted' | 'dark'
  headerHeight: number
  logo: string
  siderWidth: number
  siderCollapsedWidth: number
  showSiderTrigger: boolean | 'bar' | 'arrow-circle'
  inverted: boolean
  collapsed: boolean
  theme: string
}
export const layoutThemeConfig: LayoutTheme = {
  title: 'PT一下你就知道',
  layout: 'side',
  layoutStyle: 'inverted',
  headerHeight: 48,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  showSiderTrigger: 'bar',
  inverted: false,
  collapsed: false,
  theme: 'default',
  logo,
}
