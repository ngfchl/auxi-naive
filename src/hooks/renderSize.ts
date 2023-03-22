export default (value: string | number | null | '') => {
  if (value === null || value === '')
    return 0

  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(typeof value === 'string' ? value : value.toString())
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  const size = srcsize / Math.pow(1024, index)
  // 保留的小数位数
  return `${size.toFixed(2)} ${unitArr[index]}`
}
