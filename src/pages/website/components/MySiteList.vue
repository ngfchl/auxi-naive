<script lang="ts" setup>
import { CardSharp, Cloudy, ColorWandOutline, ColorWandSharp, MailUnreadSharp, Man, RefreshSharp, SearchSharp, ShareSharp, SwapVerticalSharp, WarningSharp } from '@vicons/ionicons5'
import renderSize from '../../../hooks/renderSize'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import { useWebsiteStore } from '~/stores/website'
import SignInList from '~/pages/website/components/SignInList.vue'
import numberFormat from '~/hooks/numberFormat'
defineEmits(['update:eDrawer'])
const websiteStore = useWebsiteStore()
const {
  eDrawer,
  currentSite,
  searchKey,
  showList,
  drawerTitle,
  sign_today,
  signInList,
  siteHistory,
  siteStatusList,
  dataLength, days,
} = storeToRefs(websiteStore)

const {
  siteEChart,
  siteSearch,
  initData,
  editMysite,
  signSite,
  getSignList,
  refreshSite,
  updateMySiteStatus,
} = websiteStore

/**
 * 挂载时初始化数据
 */
onMounted(async () => {
  await initData()
})
</script>

<template>
  <n-space class="mb-2 flex items-center">
    <n-button
      type="warning"
      size="small"
      class="flex items-center"
      @click="initData()"
    >
      {{ siteStatusList.length }}
      <n-icon size="18" class="ml-1">
        <RefreshSharp />
      </n-icon>
    </n-button>
    <n-button
      size="small"
      type="success"
      @click="editMysite(0)"
    >
      添加
    </n-button>
    <n-input
      v-model:value="searchKey"
      size="small"
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
    cols="400:1 600:2 900:3 1200:4"
    responsive="self"
    x-gap="12"
    y-gap="8"
  >
    <n-gi
      v-for="{ site, my_site, status, sign } in showList"
      :key="my_site.id"
      :timestamp="`加入时间: ${my_site.joined.replace('T', ' ')}`"
    >
      <n-card hoverable embedded>
        <template #header>
          <div class="text-13px">
            <span class="text-16px flex items-center justify-between">
              <n-button
                text
                tag="a"
                :href="site.url"
                target="_blank"
                type="primary"
              >
                <n-image
                  :src="site.logo"
                  class="w-14px mr-1" alt=""
                  fallback-src="https://gitee.com/ngfchl/auxi-naive/raw/master/public/ptools.svg"
                />
                {{ my_site.nickname }}
                <n-tag
                  v-for="tag in site.tags.split(',')" :key="tag"
                  size="small" type="error" :bordered="false"
                  class="ml-2 text-#3b5769"
                >
                  {{ tag }}
                </n-tag>

              </n-button>
              <n-space>
                <n-button size="small" ghost type="primary" @click="updateMySiteStatus(my_site.id)">
                  <MenuIcon icon="ReloadSharp" />
                </n-button>
                <n-button size="small" ghost type="info" @click="siteEChart(my_site.id)">
                  数据
                </n-button>
              </n-space>
            </span>

            <div class="flex items-center">
              <n-tag
                v-if="status.my_level.length > 0"
                size="small" :bordered="false" type="primary"
              >
                <template #icon>
                  <n-icon>
                    <Man />
                  </n-icon>
                </template>
                <n-ellipsis>
                  {{ status.my_level }}
                </n-ellipsis>
              </n-tag>
              <n-tag
                v-if="status.invitation > 0"
                type="success"
                size="small" :bordered="false"
              >
                <template #icon>
                  <n-icon>
                    <CardSharp />
                  </n-icon>
                </template>
                <n-ellipsis>
                  {{ status.invitation }}
                </n-ellipsis>
              </n-tag>
              <n-tag
                v-if="String(status.my_hr).length > 0 && Number(status.my_hr) > 0"
                class="text-blue-500 mr-2"
                size="small" :bordered="false" type="error"
              >
                <!--            <i :title="'加入时间：' + my_site.time_join" class="n-icon-date" -->
                <!--               style="color: darkgreen" -->
                <!--               v-text="' ' + site.weeks"></i> -->
                <!--            <br v-if="status.my_hr !== 0 || status.mail > 0"> -->
                <template #icon>
                  <n-icon><WarningSharp /></n-icon>
                </template>

                <n-ellipsis
                  style="color: orangered;"
                  title="H&R"
                >
                  {{ status.my_hr }}
                </n-ellipsis>
              </n-tag>
              <n-tag
                v-if="status.mail > 0"
                class="text-blue-500 mr-2 flex items-center"
                size="small" :bordered="false" type="warning"
              >
                <template #icon>
                  <n-icon size="13">
                    <MailUnreadSharp />
                  </n-icon>
                </template>
                <n-ellipsis
                  :href="site.url + site.page_message"
                  target="_blank"
                >
                  {{ status.mail }}
                </n-ellipsis>
              </n-tag>
            </div>
          </div>
        </template>
        <template #default>
          <div v-if="status.updated_at">
            <div class="flex items-center justify-between">
              <span class="text-#3b5769 font-bold">保种分享：</span>
              <div class="flex items-center">
                <n-tag size="small" :bordered="false">
                  <template #icon />
                  <n-icon class="mr-1">
                    <Cloudy />
                  </n-icon>
                  <span>{{ renderSize(status.seed_volume) }}</span>
                </n-tag>

                <n-tag size="small" :bordered="false">
                  <template #icon>
                    <n-icon class="ml-2 mr-1">
                      <ShareSharp />
                    </n-icon>
                  </template>
                  <span style="color: saddlebrown" title="分享率">
                    {{ status.downloaded > 0 ? numberFormat(Number((status.uploaded / status.downloaded).toFixed(2))) : '∞' }}
                  </span>
                </n-tag>
              </div>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="font-weight: bold;color: #3b5769;line-height: 36px">实时数据：</span>
              <span style="text-align: right;">
                <span class="flex items-center justify-end">
                  <n-tag size="small" :bordered="false">
                    <span style="color: green" title="做种数量">
                      {{ status.seed }}
                    </span>
                  </n-tag>
                  <n-tag size="small" :bordered="false">
                    <template #icon>
                      <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                    </template>
                    <span style="color: indianred" title="正在下载" v-text="status.leech" />
                  </n-tag>
                </span>
                <n-divider />
                <span style="text-align: right;" class="flex items-center justify-end">
                  <n-tag size="small" :bordered="false">
                    <span
                      style="color: green" title="上传量"
                      v-text="renderSize(status.uploaded)"
                    />
                  </n-tag>
                  <n-tag size="small" :bordered="false">
                    <template #icon>
                      <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                    </template>
                    <span
                      style="color: indianred" title="下载量"
                      v-text="renderSize(status.downloaded)"
                    />
                  </n-tag>
                </span>
              </span>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="font-weight: bold;color: #3b5769;">魔力/积分：</span>
              <div class="text-right">
                <n-tag size="small" :bordered="false">
                  <template #icon>
                    <n-icon>
                      <ColorWandOutline />
                    </n-icon>
                  </template>
                  <span
                    style="color: darkorange" title="魔力/积分"
                  >
                    <span v-text="` ${numberFormat(status.my_bonus)}`" />
                    <span v-if="status.my_score !== 0" v-text="` / ${numberFormat(status.my_score)}`" />
                  </span>
                </n-tag>

                <n-divider />
                <n-tag size="small" :bordered="false">
                  <template #icon>
                    <n-icon>
                      <ColorWandSharp />
                    </n-icon>
                  </template>
                  <i
                    v-if="status.bonus_hour !== 0"
                    style="color: coral"
                    class="ml-1"
                    title="时魔"
                    v-text="`${status.bonus_hour.toFixed(2)} / ${(status.bonus_hour / site.sp_full * 100).toFixed(2)}%`"
                  />
                  <i
                    v-else
                    style="color: coral"
                    title="时魔" v-text="status.bonus_hour.toFixed(2)"
                  />
                </n-tag>
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
              v-if="my_site.get_info && site.func_get_userinfo" size="small" type="primary"
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
              v-if="sign && sign.sign_in_today" size="small" type="success" ghost
              @click="getSignList(my_site.id)"
            >
              签到
              <MenuIcon size="20" icon="CheckboxSharp" color="green" />
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
    v-model:show="eDrawer"
    resizable
    height="100%"
    placement="top"
    style="--n-body-padding:6px 6px"
  >
    <n-drawer-content closable>
      <template #header>
        <h4 class="title" style="text-align: center;" v-text="drawerTitle" />
      </template>
      <div class="flex justify-center mb-2">
        <n-radio-group
          v-model:value="dataLength" size="small"
          default-value="-7"
        >
          <n-radio-button
            v-for="day in days"
            :key="day.value"
            :value="day.value"
            @change="siteEChart(currentSite, dataLength)"
          >
            {{ day.label }}
          </n-radio-button>
        </n-radio-group>
      </div>

      <SignInList v-if="sign_today" :sign-list="signInList" />
      <ECharts v-else :my-option="siteHistory" theme="dark" style="width: 95vw;height: 80vh;" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical){
  margin-top:2px;
  margin-bottom: 2px;
}
</style>
