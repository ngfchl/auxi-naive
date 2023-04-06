<script lang="ts" setup>
import Downloading from '~/pages/dashboard/components/downloading.vue'
import Pay from '~/pages/dashboard/components/pay.vue'
import PerDay from '~/pages/dashboard/components/per-day.vue'
import SiteInfo from '~/pages/dashboard/components/site-info.vue'
import DownloadItems from '~/pages/dashboard/components/download-items.vue'
import TodayData from '~/pages/dashboard/components/today-data.vue'
import TotalInfo from '~/pages/dashboard/components/total-info.vue'
import MySiteList from '~/pages/website/components/MySiteList.vue'

const downloadStore = useDownloadStore()
const { speedList, downloadingFlag } = storeToRefs(downloadStore)
const { getSpeedList } = downloadStore
const websiteStore = useWebsiteStore()

const {
  siteInfoFlag, barOption, pieOption, dataLength, days, pieTotalOption,
} = storeToRefs(websiteStore)

const {
  getPerDayData, getTodayDataList,
} = websiteStore
onBeforeMount(async () => {
  await getPerDayData()
  await getTodayDataList()
  await getSpeedList()
})
</script>

<template>
  <n-grid cols="400:1 600:2" y-gap="5" x-gap="5" item-responsive>
    <n-gi>
      <Pay />
    </n-gi>
    <n-gi>
      <SiteInfo />
    </n-gi>
    <n-gi v-if="siteInfoFlag" span="24">
      <MySiteList />
    </n-gi>
    <n-gi>
      <TotalInfo />
    </n-gi>

    <n-gi>
      <PerDay />
    </n-gi>
    <n-gi>
      <TodayData />
    </n-gi>
    <n-gi><Downloading /></n-gi>
    <n-gi v-if="downloadingFlag" span="24">
      <DownloadItems :speed-list="speedList" />
    </n-gi>
  </n-grid>
</template>
