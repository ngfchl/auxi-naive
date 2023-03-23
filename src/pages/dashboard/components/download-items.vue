<script setup lang="ts">
import { ArrowDownSharp, ArrowUpSharp } from '@vicons/ionicons5'
import renderSize from '~/hooks/renderSize'
import type { DownloadSpeedType } from '~/api/download'

withDefaults(defineProps<{
  speedList: DownloadSpeedType[]
}>(), {
  speedList: () => [
    {
      name: 'speed',
      connection_status: false,
      dl_info_data: 0,
      dl_info_speed: 0,
      up_info_data: 0,
      up_info_speed: 0,
      category: 'none',
    },
  ],
})
</script>

<template>
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
</template>

<style scoped>

</style>
