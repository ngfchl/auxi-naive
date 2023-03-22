<script lang="ts" setup>
import { ArrowDownSharp, ArrowUpSharp } from '@vicons/ionicons5'
import renderSize from '~/hooks/renderSize'
const downloadStore = useDownloadStore()
const { getSpeedListTimer, clearSpeedListTimer } = downloadStore
const { speedList } = toRefs(downloadStore)

onMounted(async () => {
  await getSpeedListTimer()
  setTimeout(() => {
    clearSpeedListTimer()
  }, 1000 * 60 * 15)
})
</script>

<template>
  <n-space class="flex gap-0 justify-center" justify="space-around" size="large">
    <n-button type="success" @click="getSpeedListTimer()">
      刷新
    </n-button>
    <n-button type="warning" @click="clearSpeedListTimer()">
      停止刷新
    </n-button>
    <n-space>
      <n-progress
        v-for="speed in speedList"
        :key="speed.name"
        style="width: 160px;"
        type="multiple-circle"
        :stroke-width="4"
        :circle-gap="1"
        :gap-degree="45"
        :gap-offset-degree="225"
        :percentage="[
          speed.up_info_speed / (1024 * 512),
          speed.dl_info_speed / (1024 * 512),
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
              {{ renderSize(speed.up_info_speed) }}
            </n-button>
            <n-button secondary type="warning" class="min-width-120px">
              <template #icon>
                <n-icon>
                  <ArrowDownSharp />
                </n-icon>
              </template>
              {{ renderSize(speed.dl_info_speed) }}
            </n-button>
          </n-button-group>
          <span class="flex justify-center items-center text-14px">
            <n-image
              width="13"
              :src="speed.category === 'Qb' ? '/images/qb32.png' : '/images/tr.png'"
              preview-disabled
            />
            {{ speed.name }}
          </span>
        </div>
      </n-progress>
    </n-space>
  </n-space>
</template>
