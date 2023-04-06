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
    <template #header>
      <span class="flex justify-center items-center text-14px mt-2">
        <!--            <n-image -->
        <!--              width="13" -->
        <!--              :src="speedTotal.category === 'Qb' ? '/images/qb32.png' : '/images/tr.png'" -->
        <!--              preview-disabled -->
        <!--            /> -->
        {{ speedTotal.name }}
      </span>
    </template>
    <template #default>
      <n-progress
        style="width: 201px;"
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
        <div class="mt-5 text-center">
          <n-button-group vertical size="tiny">
            <n-button secondary type="success" width="120">
              <template #icon>
                <n-icon>
                  <ArrowUpSharp />
                </n-icon>
              </template>
              <!--              ${renderSize(speedTotal.up_info_data)}` -->
              {{ `${renderSize(speedTotal.up_info_speed)}` }}
            </n-button>
            <n-button secondary type="warning" class="min-width-120px">
              <template #icon>
                <n-icon>
                  <ArrowDownSharp />
                </n-icon>
              </template>
              <!--              / ${renderSize(speedTotal.dl_info_data)}` -->
              {{ `${renderSize(speedTotal.dl_info_speed)}` }}
            </n-button>
          </n-button-group>
        </div>
      </n-progress>
    </template>
    <template #action>
      <n-space>
        <n-button v-if="downloadingFlag" size="small" secondary type="error" @click="downloadingFlag = false">
          收起
        </n-button>
        <n-button v-else secondary size="small" type="success" @click="downloadingFlag = true">
          展开
        </n-button>
        <n-button v-if="timer" size="small" type="warning" @click="clearSpeedListTimer">
          停止刷新
        </n-button>
        <n-button v-else size="small" type="success" @click="getSpeedListTimer">
          刷新
        </n-button>
        <n-tooltip>
          <template #trigger>
            <n-input-number
              v-model:value="interval"
              button-placement="both"
              min="1" max="5"
              class="w-80px"
              size="small"
              placeholder="刷新间隔"
              title="刷新间隔"
              @blur="setIntervalDefault"
              @update:value="getSpeedListTimer"
            />
          </template>
          <span>实时数据刷新间隔，最小1，最大5，单位：秒</span>
        </n-tooltip>
        <n-tooltip>
          <template #trigger>
            <n-input-number
              v-model:value="timeout"
              button-placement="both"
              min="1" max="15"
              class="w-80px"
              size="small"
              placeholder="刷新持续时间"
              title="刷新持续时间"
              @blur="setTimeoutDefault"
              @update:value="getSpeedListTimer"
            />
          </template>
          <span>刷新持续时间，最小1，最大15，单位：分钟</span>
        </n-tooltip>
      </n-space>
    </template>
  </n-card>
</template>
