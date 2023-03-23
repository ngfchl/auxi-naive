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

export const downloadSpeedUrl = 'download/downloaders/speed'
/**
 * 获取下载器实时数据
 */
export const getDownloadSpeedList: () => Promise<any> = async () => {
  return await getList<null, DownloadSpeedType[]>(downloadSpeedUrl)
}

/**
 * 获取下载器列表
 */
export const getDownloaderList = async () => {
  return await getList('download/downloaders')
}
