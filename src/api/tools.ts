import { getList } from '~/hooks/getList'

const { message } = useGlobalConfig()
export const $getLogList = async () => {
  return await getList<null, string[]>('config/log')
}

export const $getLogContent = async (file_name: string) => {
  return await getList<object, string>('config/log/content', { file_name })
}

export const $downloadLog = async (file_name: string) => {
  return await useGet<object, string[]>('config/log/download', { file_name })
}

export const $removeLog = async (file_name: string) => {
  const { code, msg } = await useDelete<object>('config/log', { file_name })
  switch (code) {
    case 0:
      if (msg.length > 0) message?.success(msg, { keepAliveOnHover: true })
      return true
    default:
      message?.warning(
        msg,
        {
          keepAliveOnHover: true,
        },
      )
      return false
  }
}
