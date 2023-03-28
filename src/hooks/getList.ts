import { useGlobalConfig } from '~/composables/gobal-config'

export const getList = async <P = any, T = any>(url: string, params?: P) => {
  const { message } = useGlobalConfig()
  let response = await useGet<P, T | T[]>(url, params)
  if (typeof response === 'string') {
    // 正则表达式查找替换所有无穷大字符
    const reg = /Infinity/g
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const res_info = response.replace(reg, '"∞"')
    response = JSON.parse(res_info)
  }
  const { code, msg, data } = response
  if (code !== 0) {
    message?.warning(
      msg,
      {
        keepAliveOnHover: true,
      },
    )
    return false
  }
  else {
    message?.success(
      msg,
      {
        keepAliveOnHover: true,
      },
    )
    return data
  }
}
