interface Param {
  value: number
  unit: string
}

export default (value: number | 'infinity' | 'Infinity') => {
  if ((`${value}`).toLowerCase() === 'infinity')
    return '∞'

  // if (!isNaN(parseFloat(value))) {
  //     return value
  // }
  const param: Param = {
    value: 0,
    unit: '',
  }
  if (typeof value !== 'number')
    value = parseInt(value)

  const k = 10000
  const sizes = ['', 'W', 'E']
  let i

  if (value < k) {
    param.value = value
    param.unit = ''
  }
  else {
    i = Math.floor(Math.log(value) / Math.log(k))
    param.value = Number(((value / Math.pow(k, i))).toFixed(2))
    param.unit = sizes[i]
  }
  return `${param.value}${param.unit}`
}
