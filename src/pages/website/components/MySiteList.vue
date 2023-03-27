<script lang="ts" setup>
import { CardSharp, Cloudy, ColorWandOutline, ColorWandSharp, Man, NotificationsCircleSharp, RefreshSharp, SearchSharp, ShareSharp, SwapVerticalSharp, WarningSharp } from '@vicons/ionicons5'
import renderSize from '../../../hooks/renderSize'
import { useWebsiteStore } from '~/stores/website'
import MySiteForm from '~/pages/website/components/MySiteForm.vue'
import SignInList from '~/pages/website/components/SignInList.vue'
import numberFormat from '~/hooks/numberFormat'
const websiteStore = useWebsiteStore()
const {
  eDrawer,
  searchKey,
  showList,
  siteStatusList,
  mySiteList,
  addMySiteFormRules,
  mySite,
  showAddMySite,
  mySiteForm,
  siteInfoList,
  signInList,
  siteHistory,
} = storeToRefs(websiteStore)

const {
  initSomeData,
  siteEChart,
  siteSearch,
  initData,
  editMysite,
  signSite,
  getSignList,
  refreshSite,
} = websiteStore
/**
 * 挂载时初始化数据
 */
onMounted(async () => {
  await initData()
})
</script>

<template>
  <n-space class="mb-2">
    <n-button
      type="warning"
      @click="initData()"
    >
      <n-icon size="18">
        <RefreshSharp />
      </n-icon>
    </n-button>
    <n-button
      type="success"
      @click="editMysite(0)"
    >
      添加
    </n-button>
    <n-input
      v-model:value="searchKey"
      autofocus
      :input-props="{ autocomplete: 'off' }"
      clearable
      placeholder="名称昵称网址等"
      @input="siteSearch"
    >
      <template #suffix>
        <n-icon>
          <SearchSharp />
        </n-icon>
      </template>
    </n-input>
  </n-space>

  <n-grid
    cols="sm:1 m:2 l:3 xl:4 2xl:6"
    responsive="screen"
    x-gap="12"
    y-gap="8"
  >
    <n-gi
      v-for="{ site, my_site, status, sign } in showList"
      :key="my_site.id"
      :timestamp="`加入时间: ${my_site.joined.replace('T', ' ')}`"
    >
      <n-card>
        <template #header>
          <div class="text-13px">
            <span class="text-16px flex items-center justify-between">
              <n-button
                text
                tag="a"
                :href="site.url"
                target="_blank"
                type="error"
              >
                <img :src="site.logo" class="w-15px mr-1" alt="">
                {{ my_site.nickname }}
                <small class="ml-2" v-text="site.tags" />

              </n-button>
              <n-button size="small" ghost type="info" @click="siteEChart(my_site.id)">
                历史
              </n-button>
            </span>

            <div class="flex items-center">
              <span class="text-red-500 mr-2 flex items-center">
                <n-ellipsis>
                  <n-icon>
                    <Man />
                  </n-icon>
                  {{ status.my_level }}
                </n-ellipsis>
              </span>
              <span class="text-blue-500 mr-2 flex items-center">
                <n-icon><CardSharp /></n-icon>
                <n-ellipsis>
                  {{ status.invitation }}
                </n-ellipsis>
                <!--            <i :title="'加入时间：' + my_site.time_join" class="n-icon-date" -->
                <!--               style="color: darkgreen" -->
                <!--               v-text="' ' + site.weeks"></i> -->
                <!--            <br v-if="status.my_hr !== 0 || status.mail > 0"> -->

                <span
                  v-if="status.my_hr !== 0"
                  class="ml-2 flex items-center"
                  style="color: orangered"
                  title="H&R"
                >
                  <n-ellipsis>
                    <n-icon><WarningSharp /></n-icon>
                    {{ status.my_hr }}
                  </n-ellipsis>

                </span>
                <n-button
                  v-if="status.mail > 0"
                  :href="site.url + site.page_message"
                  style="color: darkred;font-size: 13px;"
                  target="_blank"
                >
                  <n-icon><NotificationsCircleSharp /></n-icon>
                  {{ status.mail }}
                </n-button>
              </span>
            </div>
          </div>
        </template>
        <template #default>
          <div v-if="status.updated_at">
            <div class="flex items-center justify-between">
              <span class="float-left text-#3b5769 font-bold">保种分享：</span>
              <div style="float: right">
                <n-icon>
                  <Cloudy />
                </n-icon>
                {{ renderSize(status.seed_volume) }}
                <n-icon>
                  <ShareSharp />
                </n-icon>
                <span class="n-icon-share" style="color: saddlebrown" title="分享率">
                  {{ status.downloaded > 0 ? numberFormat(Number((status.uploaded / status.downloaded).toFixed(2))) : '∞' }}
                </span>
              </div>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="float: left;font-weight: bold;color: #3b5769;line-height: 36px">实时数据：</span>
              <span style="text-align: right;float: right">
                <span style="color: green" title="做种数量" v-text="status.seed" />
                <span>
                  <n-icon><SwapVerticalSharp /></n-icon>
                </span>
                <span style="color: indianred" title="正在下载" v-text="status.leech" />
                <br>
                <span
                  style="color: green" title="上传量"
                  v-text="renderSize(status.uploaded)"
                />
                <n-icon><SwapVerticalSharp /></n-icon>
                <span
                  style="color: indianred" title="下载量"
                  v-text="renderSize(status.downloaded)"
                />
              </span>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="float: left;line-height: 36px;font-weight: bold;color: #3b5769;">魔力/积分：</span>
              <div class="text-right">
                <n-icon>
                  <ColorWandOutline />
                </n-icon>
                <span
                  style="color: darkorange" title="魔力/积分"
                >
                  <span v-text="` ${numberFormat(status.my_bonus)}`" />
                  <span v-if="status.my_score !== 0" v-text="` / ${numberFormat(status.my_score)}`" />
                </span>
                <br>
                <n-icon>
                  <ColorWandSharp />
                </n-icon>
                <i
                  v-if="status.bonus_hour !== 0"
                  style="color: coral"
                  title="时魔"
                  v-text="`${status.bonus_hour.toFixed(2)} / ${(status.bonus_hour / site.sp_full * 100).toFixed(2)}%`"
                />
                <i
                  v-else
                  style="color: coral"
                  title="时魔" v-text="status.bonus_hour.toFixed(2)"
                />
              </div>
            </div>
          </div>
          <div v-else style="margin-bottom: 25px;">
            这个站点还没有数据历史记录呀，快去刷新一下吧
          </div>
          <n-divider />
          <p v-if="status.updated">
            最后更新时间：{{ status.updated }}
          </p>
        </template>
        <template #action>
          <n-space class="mt--10px mb--10px">
            <n-button
              v-if="my_site.get_info && site.func_get_userinfo" size="small" type="success"
              @click="refreshSite(my_site.id)"
            >
              刷新
            </n-button>
            <n-button
              v-if="my_site.get_torrents && site.func_get_torrents" size="small" type="warning"
              @click="updateTorrents(my_site.id)"
            >
              种子
            </n-button>
            <n-button v-if="my_site.hr && site.func_hr_discern" size="small" type="warning">
              H&&R
            </n-button>
            <n-button v-if="my_site.brush_flow && site.func_brush_flow" size="small" type="warning">
              刷流
            </n-button>
            <n-button v-if="my_site.search && site.func_search_torrents" size="small" type="warning">
              聚合
            </n-button>
            <n-button v-if="my_site.repeat_torrents && site.func_repeat_torrents" size="small" type="warning">
              辅种
            </n-button>

            <n-button size="small" type="error" @click="editMysite(my_site.id)">
              编辑
            </n-button>
            <n-button
              v-if="my_site.sign_in && site.func_sign_in && (!sign || !sign.sign_in_today)"
              size="small"
              type="primary"
              @click="signSite(my_site.id)"
            >
              签到
            </n-button>
            <n-button
              v-if="sign && sign.sign_in_today" size="small" type="primary"
              @click="getSignList(my_site.id)"
            >
              签到历史
            </n-button>
          </n-space>
        </template>
      </n-card>
    </n-gi>
  </n-grid>

  <!--  <el-dialog -->
  <!--    v-model="showAddMySite" -->
  <!--    :title="title" -->
  <!--    center -->
  <!--    @close="mySiteForm = mySite" -->
  <!--  > -->
  <!--    <MySiteForm -->
  <!--      :add-my-site-form="mySiteForm" -->
  <!--      :site-info-list="siteInfoList" -->
  <!--      @closeEditForm="closeEditForm" -->
  <!--    /> -->
  <!--  </el-dialog> -->
  <n-drawer
    v-model="eDrawer" class="detail"
    destroy-on-close
    direction="btt"
    size="100%" style="direction: ltr;"
  >
    <template #default>
      <h4 class="title" style="text-align: center;" v-text="drawerTitle" />
    </template>
    <!--    <SignInList v-if="sign" :sign-list="signInList" style="direction: ltr;" /> -->
    <!--    <ECharts v-if="chart" :my-option="siteHistory" style="width: 95vw;height: 80vh;" /> -->
  </n-drawer>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical){
margin-top:2px;
  margin-bottom: 2px;
}
</style>
