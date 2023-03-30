import { getList } from '~/hooks/getList'

export interface DownloadSpeedType {
  name: string
  connection_status: boolean
  dl_info_data: number
  dl_info_speed: number
  up_info_data: number
  up_info_speed: number
  category: string
}

export interface Downloader {
  id: number
  name: string
  usernames?: string
  password?: string
  host: string
  port?: number
  category: string
  enable: boolean
  reserved_space?: number
}

const { message } = useGlobalConfig()

export const downloadSpeedUrl = 'download/downloaders/speed'
/**
 * 获取下载器实时数据
 */
export const $getDownloadSpeedList: () => Promise<any> = async () => {
  return await getList<null, DownloadSpeedType[]>(downloadSpeedUrl)
}

/**
 * 获取下载器列表
 */
export const $getDownloaderList: () => Promise<any> = async () => {
  return await getList<Downloader[]>('download/downloaders')
}

export const $getDownloader: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Downloader>('download/downloader', params)
}

export const $addDownloader = async (downloader: Downloader) => {
  const { msg, code } = await usePost('download/downloader', downloader)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $editDownloader = async (downloader: Downloader) => {
  const { msg, code } = await usePut('download/downloader', downloader)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $removeDownloader = async (params: object) => {
  const { msg, code } = await useDelete('download/downloader', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
