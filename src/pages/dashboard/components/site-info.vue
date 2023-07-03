<script setup lang="ts">
import { CardSharp, Cloudy, ColorWandOutline, MailUnreadSharp, ShareSharp, SwapVerticalSharp } from '@vicons/ionicons5'
import numberFormat from '../../../hooks/numberFormat'
import renderSize from '../../../hooks/renderSize'
import { calculateWeeksAndDays } from '~/hooks/calculateWeeksAndDays'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const websiteStore = useWebsiteStore()
const {
  totalData, siteInfoFlag, ptYear,
} = storeToRefs(websiteStore)
const loading = ref(false)
const {
  getTotalData, signAllSite, refreshAllSite,
} = websiteStore
onBeforeMount(async () => {
  loading.value = true
  await getTotalData()
  loading.value = false
})
</script>

<template>
  <n-card hoverable embedded>
    <template #header>
      <n-skeleton v-if="loading" text width="60%" />
      <n-space v-else justify="center" class="text-16px flex items-center justify-between">
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
              <MailUnreadSharp />
            </n-icon>
          </template>
          {{ totalData.mail }}
        </n-button>
      </n-space>
    </template>
    <template #default>
      <n-skeleton v-if="loading" text :repeat="6" />
      <div v-else>
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
            <span
              style="color: indianred" title="下载数量"
              v-text="totalData.leech"
            />
            <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
            <span style="color: green" title="做种数量">
              {{ totalData.seed }}
            </span>
            <n-divider />
            <span
              style="color: indianred" title="下载量"
              v-text="renderSize(totalData.downloaded)"
            />
            <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
            <span
              style="color: green" title="上传量"
              v-text="renderSize(totalData.uploaded)"
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
            <span
              style="color: coral"
              title="时魔"
            >🕓 {{ totalData.bonus_hour.toFixed(2) }}</span>
          </div>
        </div>
        <n-divider />
        <n-space justify="space-between">
          <span style="font-weight: bold;color: #3b5769;">P龄：</span>
          <span style="color: orange">🔥 {{ calculateWeeksAndDays(ptYear) }}</span>
        </n-space>
        <n-divider />
        <p>
          <span style="font-weight: bold;color: #3b5769;">最后更新时间：</span>
          {{ totalData.updated }}
        </p>
      </div>
    </template>
    <template #action>
      <n-space class="mt--10px mb--10px" justify="center">
        <n-button
          size="small" type="primary"
          @click="refreshAllSite"
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
          @click="signAllSite"
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
