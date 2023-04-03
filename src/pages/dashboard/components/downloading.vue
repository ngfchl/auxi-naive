<script lang="ts" setup>
import { ArrowDownSharp, ArrowUpSharp } from '@vicons/ionicons5'
import renderSize from '~/hooks/renderSize'

const downloadStore = useDownloadStore()
const {
  getSpeedListTimer, clearSpeedListTimer, getSpeedList, setIntervalValue,
  setTimeoutValue,
} = downloadStore
const { downloadingFlag, timer, speedTotal, interval, timeout } = storeToRefs(downloadStore)
const setIntervalDefault = () => {
  if (interval.value < 1 || !interval.value)
    setIntervalValue(5)
}
const setTimeoutDefault = () => {
  if (interval.value < 1 || !interval.value)
    setIntervalValue(1)
}
</script>

<template>
  <n-card class="flex justify-center items-center" hoverable embedded>
    <n-progress
      style="width: 325px;"
      type="multiple-circle"
      :stroke-width="8"
      :circle-gap="1"
      :gap-degree="45"
      :gap-offset-degree="225"
      :percentage="[
        speedTotal.up_info_speed / (1024 * 1024),
        speedTotal.dl_info_speed / (1024 * 1024),
      ]"
      :color="[
        '#3BA272',
        '#EE6666',
      ]"
    >
      <div style="text-align: center">
        <n-button-group vertical size="small" class="mt-5">
          <n-button round secondary type="success" width="120">
            <template #icon>
              <n-icon>
                <ArrowUpSharp />
              </n-icon>
            </template>
            {{ `${renderSize(speedTotal.up_info_speed)} / ${renderSize(speedTotal.up_info_data)}` }}
          </n-button>
          <n-button secondary type="warning" class="min-width-120px">
            <template #icon>
              <n-icon>
                <ArrowDownSharp />
              </n-icon>
            </template>
            {{ `${renderSize(speedTotal.dl_info_speed)} / ${renderSize(speedTotal.dl_info_data)}` }}
          </n-button>
          <n-button>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-input-number
                  v-model:value="interval"
                  button-placement="both"
                  min="1" max="5"
                  placeholder="刷新间隔"
                  title="刷新间隔"
                  :bordered="false"
                  @blur="setIntervalDefault"
                  @change="getSpeedListTimer"
                />
              </template>
              <span>实时数据刷新间隔，最小1，最大5，单位：秒</span>
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-input-number
                  v-model:value="timeout"
                  button-placement="both"
                  min="1" max="15"
                  placeholder="刷新持续时间"
                  title="刷新持续时间"
                  :bordered="false"
                  @blur="setTimeoutDefault"
                  @change="getSpeedListTimer"
                />
              </template>
              <span>刷新持续时间，最小1，最大15，单位：分钟</span>
            </n-tooltip>
          </n-button>
          <n-button v-if="downloadingFlag" secondary type="error" @click="downloadingFlag = false">
            收起
          </n-button>
          <n-button v-else secondary type="success" @click="downloadingFlag = true">
            展开
          </n-button>
          <n-button v-if="timer" round type="warning" @click="clearSpeedListTimer">
            停止刷新
          </n-button>
          <n-button v-else round type="success" @click="getSpeedListTimer">
            刷新
          </n-button>
        </n-button-group>
        <span class="flex justify-center items-center text-14px">
          <!--            <n-image -->
          <!--              width="13" -->
          <!--              :src="speedTotal.category === 'Qb' ? '/images/qb32.png' : '/images/tr.png'" -->
          <!--              preview-disabled -->
          <!--            /> -->
          {{ speedTotal.name }}
        </span>
      </div>
    </n-progress>
  </n-card>
</template>
