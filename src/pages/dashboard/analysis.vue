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
  siteInfoFlag, barOption, pieOption, dataLength, days, pieTotalOption,
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
      <n-card hoverable embedded>
        <div class="flex justify-center">
          <n-button ghost size="small" color="#FF4500">
            全部数据
          </n-button>
        </div>
        <ECharts :my-option="pieTotalOption ? pieTotalOption : {}" style="width: 100%" />
      </n-card>
    </n-gi>
    <n-gi>
      <SiteInfo />
    </n-gi>
    <n-gi>
      <n-card hoverable embedded>
        <n-radio-group
          v-model:value="dataLength" size="small"
          default-value="-7"
          @change="getPerDayData(dataLength)"
        >
          <n-radio-button
            v-for="day in days"
            :key="day.value"
            :value="day.value"
          >
            {{ day.label }}
          </n-radio-button>
        </n-radio-group>
        <ECharts :my-option="barOption ? barOption : {}" style="width: 100%" />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card hoverable embedded>
        <div class="flex justify-center">
          <n-button ghost size="small" color="#FF4500">
            今日数据
          </n-button>
        </div>
        <ECharts :my-option="pieOption ? pieOption : {}" style="width: 100%" />
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
