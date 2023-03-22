import type { DownloadSpeedType } from '~/api/download'
import { getDownloadSpeedList } from '~/api/download'

export const useDownloadStore = defineStore('download', () => {
  const speedList = ref<DownloadSpeedType[]>([])
  const timer = ref()
  const setDownloadSpeedList = (value: DownloadSpeedType[]) => {
    speedList.value = value
  }
  const getSpeedListTimer = async () => {
    speedList.value = await getDownloadSpeedList()
    timer.value = setInterval(async () => {
      speedList.value = await getDownloadSpeedList()
    }, 5000)
  }
  const clearSpeedListTimer = () => {
    clearInterval(timer.value)
    timer.value = null
  }
  return {
    speedList,
    getSpeedListTimer,
    setDownloadSpeedList,
    clearSpeedListTimer,
    timer,
  }
})
