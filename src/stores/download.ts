import type { DownloadSpeedType, Downloader } from '~/api/download'
import { $getDownloadSpeedList, $getDownloaderList } from '~/api/download'

export const useDownloadStore = defineStore('download', () => {
  const speedList = ref<DownloadSpeedType[]>([])
  const downloaderList = ref<Downloader[]>([])
  const timer = ref()
  const setDownloadSpeedList = (value: DownloadSpeedType[]) => {
    speedList.value = value
  }
  const getDownloaderList = async () => {
    downloaderList.value = await $getDownloaderList()
  }
  const speedTotal = reactive<DownloadSpeedType>({
    name: '总速度',
    connection_status: false,
    dl_info_data: 0,
    dl_info_speed: 0,
    up_info_data: 0,
    up_info_speed: 0,
    category: 'none',
  })
  const getSpeedTotal = () => {
    speedTotal.dl_info_data = 0
    speedTotal.dl_info_speed = 0
    speedTotal.up_info_data = 0
    speedTotal.up_info_speed = 0
    speedList.value.forEach((speed: DownloadSpeedType) => {
      speedTotal.dl_info_data += speed.dl_info_data
      speedTotal.dl_info_speed += speed.dl_info_speed
      speedTotal.up_info_speed += speed.up_info_speed
      speedTotal.up_info_data += speed.up_info_data
    })
  }
  const getSpeedList = async () => {
    speedList.value = await $getDownloadSpeedList()
    getSpeedTotal()
  }
  const clearSpeedListTimer = () => {
    clearInterval(timer.value)
    timer.value = null
  }
  const getSpeedListTimer = async () => {
    timer.value = setInterval(async () => {
      speedList.value = await $getDownloadSpeedList()
      getSpeedTotal()
    }, 5000)
    setTimeout(() => {
      clearSpeedListTimer()
    }, 1000 * 60 * 15)
  }

  return {
    timer,
    speedList,
    speedTotal,
    downloaderList,
    getSpeedListTimer,
    setDownloadSpeedList,
    clearSpeedListTimer,
    getSpeedTotal,
    getSpeedList,
    getDownloaderList,
  }
})
