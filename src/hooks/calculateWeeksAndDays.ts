/**
 * 计算时间为多少周多少天
 * @param timestamp
 */
export const calculateWeeksAndDays = (timestamp: number) => {
  const millisecondsPerDay = 60 * 60 * 24
  const days = Math.floor(timestamp / millisecondsPerDay)
  const weeks = Math.floor(days / 7)
  const remainingDays = days % 7

  let result = ''
  if (weeks > 0)
    result += `${weeks}周 `

  if (remainingDays > 0)
    result += `${remainingDays}天`
  else if (result === '')
    result = '1天'

  return result
}
