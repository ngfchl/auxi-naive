export default (timestamp: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  // date.setHours(date.getHours() + 8)
  return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
}
