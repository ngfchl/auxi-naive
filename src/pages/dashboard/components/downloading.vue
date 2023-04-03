<script lang="ts" setup>
import { ArrowDownSharp, ArrowUpSharp } from '@vicons/ionicons5'
import renderSize from '~/hooks/renderSize'

const downloadStore = useDownloadStore()
const { getSpeedListTimer, clearSpeedListTimer, getSpeedList } = downloadStore
const { downloadingFlag, timer, speedTotal, interval, timeout } = storeToRefs(downloadStore)
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
            <n-input-number v-model:value="interval" :bordered="false" @change="getSpeedListTimer" />
            <n-input-number v-model:value="timeout" :bordered="false" @change="getSpeedListTimer" />
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
