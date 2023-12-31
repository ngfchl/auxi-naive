import { getList } from '~/hooks/getList'

export interface ParentNode {
  name: string
  value: string
  children: ParentNode[]
}

export interface ParentData {
  [key: string]: string | number | boolean | ParentData
}

const { message } = useGlobalConfig()
export const $getSettingsToml: () => Promise<any> = async () => {
  return await getList<null, object>('config/system')
}

export const $getSettingsFile: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, string>('config/config', params)
}

export const $testNotify: (params: object) => Promise<any> = async (params: object) => {
  const {
    msg,
    code,
  } = await useGet<object, object>('/config/notify/test', params)
  switch (code) {
    case 0:
      message?.success('通知发送成功！')
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $saveSettingsFile: (params: object) => Promise<any> = async (params: object) => {
  const {
    msg,
    code,
  } = await usePut<object, object>('config/config', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
