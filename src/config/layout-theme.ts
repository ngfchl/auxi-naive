
export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  headerHeight: number
}
export const layoutThemeConfig: LayoutTheme = {
  title: 'Naive admin Pro',
  layout: 'mix',
  headerHeight: 48,
}
