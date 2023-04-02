<script setup lang="ts">
import {
  CardSharp, Cloudy, ColorWandOutline, ColorWandSharp, NotificationsCircleSharp, ShareSharp, SwapVerticalSharp,
} from '@vicons/ionicons5'
import renderSize from '../../../hooks/renderSize'
import numberFormat from '../../../hooks/numberFormat'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const websiteStore = useWebsiteStore()
const {
  totalData, siteInfoFlag,
} = storeToRefs(websiteStore)

const {
  getTotalData, refreshSite, signSite,
} = websiteStore
onBeforeMount(async () => {
  await getTotalData()
})
</script>

<template>
  <n-card hoverable embedded>
    <template #header>
      <n-space justify="center" class="text-16px flex items-center justify-between">
        <n-button size="small" ghost type="primary" @click="getTotalData">
          <MenuIcon icon="ReloadSharp" />
        </n-button>
        <n-button
          v-if="totalData.invitation > 0"
          size="small" ghost
          class="ml-1 flex items-center text-16px"
        >
          <template #icon>
            <n-icon size="13">
              <CardSharp />
            </n-icon>
          </template>
          {{ totalData.invitation }}
        </n-button>

        <n-button
          v-if="totalData.mail > 0"
          size="small" ghost
        >
          <template #icon>
            <n-icon size="13">
              <NotificationsCircleSharp />
            </n-icon>
          </template>
          {{ totalData.mail }}
        </n-button>
      </n-space>
    </template>
    <template #default>
      <div>
        <div class="flex items-center justify-between">
          <span class="text-#3b5769 font-bold">保种分享：</span>
          <div class="flex items-center">
            <n-icon class="mr-1">
              <Cloudy />
            </n-icon>
            <span>{{ renderSize(totalData.seed_volume) }}</span>

            <n-icon class="ml-2 mr-1">
              <ShareSharp />
            </n-icon>
            <span style="color: saddlebrown" title="分享率">
              {{ totalData.downloaded > 0 ? numberFormat(Number((totalData.uploaded / totalData.downloaded).toFixed(2))) : '∞' }}
            </span>
          </div>
        </div>
        <n-divider />
        <div class="flex items-center justify-between">
          <span style="font-weight: bold;color: #3b5769;line-height: 36px">实时数据：</span>
          <span style="text-align: right;" class="items-center">

            <span style="color: green" title="做种数量">
              {{ totalData.seed }}
            </span>
            <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
            <span style="color: indianred" title="正在下载" v-text="totalData.leech" />
            <n-divider />
            <span
              style="color: green" title="上传量"
              v-text="renderSize(totalData.uploaded)"
            />
            <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
            <span
              style="color: indianred" title="下载量"
              v-text="renderSize(totalData.downloaded)"
            />
          </span>
        </div>
        <n-divider />
        <div class="flex items-center justify-between">
          <span style="font-weight: bold;color: #3b5769;">魔力/积分：</span>
          <div class="text-right">
            <n-icon>
              <ColorWandOutline />
            </n-icon>
            <span
              style="color: darkorange" title="魔力/积分"
            >
              <span v-text="` ${numberFormat(totalData.my_bonus)}`" />
              <span v-if="totalData.my_score !== 0" v-text="` / ${numberFormat(totalData.my_score)}`" />
            </span>
            <n-divider />
            <n-icon>
              <ColorWandSharp />
            </n-icon>
            <i
              style="color: coral"
              title="时魔" v-text="totalData.bonus_hour.toFixed(2)"
            />
          </div>
        </div>
      </div>
      <n-divider />
      P龄：
      <n-divider />
      <p>
        最后更新时间：{{ totalData.updated }}
      </p>
    </template>
    <template #action>
      <n-space class="mt--10px mb--10px" justify="center">
        <n-button
          size="small" type="primary"
          @click="refreshSite"
        >
          刷新
        </n-button>
        <n-button
          size="small" type="warning"
        >
          种子
        </n-button>
        <n-button size="small" type="warning">
          辅种
        </n-button>
        <n-button
          size="small"
          type="primary"
          @click="signSite"
        >
          签到
        </n-button>
        <n-button v-if="!siteInfoFlag" size="small" ghost type="info" @click="siteInfoFlag = true">
          列表
        </n-button>
        <n-button v-else size="small" ghost type="info" @click="siteInfoFlag = false">
          收起
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical){
  margin-top: 5.5px;
  margin-bottom: 6px;
}
</style>
