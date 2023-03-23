<script lang="ts" setup>
import { ArrowDownSharp, ArrowUpSharp } from '@vicons/ionicons5'
import renderSize from '~/hooks/renderSize'
import DownloadItems from '~/pages/dashboard/components/download-items.vue'
const downloadStore = useDownloadStore()
const { getSpeedListTimer, clearSpeedListTimer } = downloadStore
const { speedList, timer, speedTotal } = storeToRefs(downloadStore)
const flag = ref(false)
onBeforeMount(async () => {
  await getSpeedListTimer()
  setTimeout(() => {
    clearSpeedListTimer()
  }, 1000 * 60 * 15)
})
</script>

<template>
  <n-space class="flex gap-0 justify-center" justify="space-around" size="large">
    <n-space class="flex justify-center">
      <n-progress
        style="width: 280px;"
        type="multiple-circle"
        :stroke-width="4"
        :circle-gap="1"
        :gap-degree="45"
        :gap-offset-degree="225"
        :percentage="[
          speedTotal.up_info_speed / (1024 * 1024),
          speedTotal.dl_info_speed / (1024 * 1024),
        ]"
        :color="[
          'ForestGreen',
          'Crimson',
        ]"
      >
        <div style="text-align: center">
          <n-button-group vertical size="small" class="mt-5">
            <n-button secondary type="success" width="120">
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
            <n-button v-if="flag" secondary type="error" @click="flag = false">
              收起
            </n-button>
            <n-button v-else secondary type="success" @click="flag = true">
              展开
            </n-button>
            <n-button v-if="timer" type="warning" @click="clearSpeedListTimer()">
              停止刷新
            </n-button>
            <n-button v-else type="success" @click="getSpeedListTimer()">
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
      <n-space v-if="flag">
        <DownloadItems :speed-list="speedList" />
      </n-space>
    </n-space>
  </n-space>
</template>
