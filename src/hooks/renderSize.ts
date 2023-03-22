type UnitTable = {
  unit: string
  ratio: number
}[]

const sizeUnits: UnitTable = [
  { unit: 'B', ratio: 1024 ** 0 },
  { unit: 'KB', ratio: 1024 ** 1 },
  { unit: 'MB', ratio: 1024 ** 2 },
  { unit: 'GB', ratio: 1024 ** 3 },
  { unit: 'TB', ratio: 1024 ** 4 },
  { unit: 'PB', ratio: 1024 ** 5 },
  { unit: 'EB', ratio: 1024 ** 6 },
  { unit: 'ZB', ratio: 1024 ** 7 },
  { unit: 'YB', ratio: 1024 ** 8 },
]

const renderSize = (value: number, precision = 2, baseUnit = 'B'): string => {
  const k = sizeUnits.findIndex(({ unit }) => unit === baseUnit)
  let size = value / sizeUnits[k].ratio
  let i = k
  while (i < sizeUnits.length - 1 && size >= 1024) {
    size /= 1024
    i++
  }
  return `${size.toFixed(precision)} ${sizeUnits[i].unit}`
}
export default renderSize
