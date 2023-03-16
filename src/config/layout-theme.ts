import logo from '~/assets/ptools.svg'
export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  headerHeight: number
  logo: string
  siderWidth: number
  siderCollapsedWidth: number
  showSiderTrigger: boolean | 'bar' | 'arrow-circle'
}
export const layoutThemeConfig: LayoutTheme = {
  title: 'Naive admin Pro',
  layout: 'mix',
  headerHeight: 48,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  showSiderTrigger: 'bar',
  logo,
}
