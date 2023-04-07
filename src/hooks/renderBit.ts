export default (fileSize: string): number => {
  if (!fileSize)
    return 0

  // 将文件大小字符串解析为字节
  const regex = /(\d+(?:\.\d+)?)\s*([kmgtp]?b)/ig
  const order = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb']

  // eslint-disable-next-line no-unreachable-loop
  for (const [, value, unit] of fileSize.matchAll(regex))
    return Math.floor(parseFloat(value) * (1024 ** order.indexOf(unit.toLowerCase())))

  return 0
}
