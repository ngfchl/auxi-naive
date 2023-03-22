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
export const getDownloadSpeedList: () => Promise<any> = async () => {
  return await getList<null, DownloadSpeedType[]>(downloadSpeedUrl)
}
