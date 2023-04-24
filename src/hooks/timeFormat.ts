export default (seconds: number) => {
  const time = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  }

  // 秒数小于1，直接返回0秒
  if (seconds < 1)
    return '0秒'

  // 大于或等于60秒才进行计算
  if (seconds >= 60) {
    time.second = Math.floor(seconds % 60)
    time.minute = Math.floor((seconds / 60) % 60)

    // 大于等于60分钟才进行计算
    if (seconds >= 3600) {
      time.hour = Math.floor((seconds / 3600) % 24)

      // 大于等于24小时才进行计算
      if (seconds >= 86400) {
        time.day = Math.floor(seconds / 86400)
        return `${time.day}天${time.hour}小时`
      }
      else {
        return `${time.hour}小时${time.minute}分`
      }
    }
    else {
      return `${time.minute}分${parseInt(time.second.toString())}秒`
    }
  }
  else {
    return `${parseInt(seconds.toString())}秒`
  }
}
