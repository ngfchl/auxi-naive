<script lang="ts" setup>
import Downloading from '~/pages/dashboard/components/downloading.vue'
import SiteInfo from '~/pages/dashboard/components/site-info.vue'
import DownloadItems from '~/pages/dashboard/components/download-items.vue'
import MySiteList from '~/pages/website/components/MySiteList.vue'

const downloadStore = useDownloadStore()
const { speedList, downloadingFlag } = storeToRefs(downloadStore)
const { getSpeedList } = downloadStore
const websiteStore = useWebsiteStore()

const {
  siteInfoFlag, barOption, pieOption,
} = storeToRefs(websiteStore)

const {
  getPerDayData, getTodayDataList,
} = websiteStore
onBeforeMount(async () => {
  await getSpeedList()
  await getPerDayData()
  await getTodayDataList()
})
</script>

<template>
  <n-grid cols="400:1 600:2" y-gap="2" x-gap="2" item-responsive>
    <n-gi>
      <n-card>总数据饼图</n-card>
    </n-gi>
    <n-gi><SiteInfo /></n-gi>
    <n-gi>
      <n-card>
        <ECharts :my-option="pieOption ? pieOption : {}" style="width: 100%" />
      </n-card>
    </n-gi>
    <n-gi span="24">
      <n-card>
        <ECharts :my-option="barOption ? barOption : {}" style="width: 100%" />
      </n-card>
    </n-gi>
    <n-gi><Downloading /></n-gi>
    <n-gi v-if="downloadingFlag">
      <n-card hoverable embedded>
        <n-space justify="space-around">
          <DownloadItems :speed-list="speedList" />
        </n-space>
      </n-card>
    </n-gi>
  </n-grid>
  <div v-if="siteInfoFlag" class="mt-2">
    <MySiteList />
  </div>
</template>
