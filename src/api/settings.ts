import { getList } from '~/hooks/getList'

export interface ParentNode {
  index: string
  name: string
  children: []
}
const { message } = useGlobalConfig()
export const $getSettingsToml: () => Promise<any> = async () => {
  return await getList<null, object>('config/system')
}

export const $getSettingsFile: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, string>('config/config', params)
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
