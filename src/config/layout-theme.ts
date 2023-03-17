import logo from '~/assets/ptools.svg'
export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  layoutStyle: 'light' | 'inverted'
  headerHeight: number
  logo: string
  siderWidth: number
  siderCollapsedWidth: number
  showSiderTrigger: boolean | 'bar' | 'arrow-circle'
  inverted: boolean
  collapsed: boolean
}
export const layoutThemeConfig: LayoutTheme = {
  title: 'Naive admin Pro',
  layout: 'mix',
  layoutStyle: 'light',
  headerHeight: 48,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  showSiderTrigger: 'bar',
  inverted: false,
  collapsed: false,
  logo,
}
