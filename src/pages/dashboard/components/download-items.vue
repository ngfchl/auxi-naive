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
  <n-card hoverable embedded>
    <n-space justify="center">
      <n-progress
        v-for="speed in speedList"
        :key="speed.name"
        :circle-gap="1"
        style="width: 130px;"
        class="ml-2"
        type="multiple-circle"
        :stroke-width="6"
        :percentage="[
          speed.up_info_speed / (1024 * 512),
          speed.dl_info_speed / (1024 * 512),
        ]"
        :color="[
          '#3BA272',
          '#EE6666',
        ]"
      >
        <div class="text-8px">
          <n-button-group vertical size="tiny" class="mt-4">
            <n-button round secondary type="success">
              <template #icon>
                <n-icon>
                  <ArrowUpSharp />
                </n-icon>
              </template>
              {{ renderSize(speed.up_info_speed) }}
            </n-button>
            <n-button round secondary type="warning">
              <template #icon>
                <n-icon>
                  <ArrowDownSharp />
                </n-icon>
              </template>
              {{ renderSize(speed.dl_info_speed) }}
            </n-button>
          </n-button-group>
          <span class="flex justify-center items-center mt-1">
            <n-image
              width="13"
              :src="speed.category === 'Qb' ? './images/qb32.png' : './images/tr.png'"
              preview-disabled
            />
            {{ speed.name }}
          </span>
        </div>
      </n-progress>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
