export const breakPointsEnum = {
  xl: 1600,
  lg: 1199,
  md: 991,
  sm: 767,
  xs: 575,
}

export const useQueryBreakPoints = () => {
  const breakPoints = reactive(useBreakpoints(breakPointsEnum))
  // 手机模式
  const isMobile = breakPoints.smaller('sm')
  // 平板模式
  const isPad = breakPoints.between('sm', 'md')
  // pc
  const isDesktop = breakPoints.greater('md')
  return {
    breakPoints, isMobile, isPad, isDesktop,
  }
}
