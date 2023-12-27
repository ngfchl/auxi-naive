<script lang="ts" setup>
import {
  CardSharp,
  Cloudy,
  ColorWandOutline,
  ColorWandSharp,
  MailUnreadSharp,
  Man,
  RefreshSharp,
  SearchSharp,
  ShareSharp,
  SwapVerticalSharp,
  WarningSharp,
} from '@vicons/ionicons5'
import renderBit from '../../../hooks/renderBit'
import renderSize from '../../../hooks/renderSize'
import type { MySite } from '~/api/website'
import { useQueryBreakPoints } from '~/composables/query-breakpoints'
import { calculateWeeksAndDays } from '~/hooks/calculateWeeksAndDays'
import numberFormat from '~/hooks/numberFormat'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import SignInList from '~/pages/website/components/SignInList.vue'
import { useWebsiteStore } from '~/stores/website'

defineEmits(['update:eDrawer'])
const websiteStore = useWebsiteStore()
const {
  eDrawer,
  spinShow,
  currentSite,
  searchKey,
  showList,
  drawerTitle,
  sign_today,
  signInList,
  siteHistory,
  siteStatusList,
  dataLength,
  days,
  page,
  pageSize,
  ptYear,
} = storeToRefs(websiteStore)

const {
  siteEChart,
  siteSearch,
  initData,
  editMysite,
  signSite,
  sortMySite,
  getSignList,
  refreshSite,
  updateMySiteStatus,
  handlePage,
  handlePageSize,
} = websiteStore
const {
  isMobile,
  isPad,
  isDesktop,
} = useQueryBreakPoints()
const tableRef = ref(true)
const slots = ref(3)
watchEffect(() => {
  if (isPad.value)
    slots.value = 9
  else if (isDesktop.value)
    slots.value = 11

  if (isMobile.value)
    slots.value = 5
})
const handleTable = (value: boolean) => {
  tableRef.value = value
  if (!tableRef.value) {
    handlePage(1)
    handlePageSize(1000)
  }
  else {
    handlePageSize(8)
  }
}

const list = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return showList.value.slice(start, end)
})
const handleUpdate = async (my_site: MySite) => {
  await sortMySite(my_site)
}
/**
 * 挂载时初始化数据
 */
onMounted(async () => {
  await initData()
  handleTable(isMobile.value)
})
</script>

<template>
  <n-space justify="start" class="z-998 absolute">
    <n-button
      size="tiny"
      secondary
      type="warning"
      @click="handleTable(!tableRef)"
    >
      切换{{ tableRef ? '表格' : '卡片' }}
    </n-button>
    <n-button
      type="warning"
      size="tiny"
      class="flex items-center"
      @click="initData()"
    >
      {{ siteStatusList.length }}
      <n-icon size="18" class="ml-1">
        <RefreshSharp />
      </n-icon>
    </n-button>
    <n-button
      size="tiny"
      type="success"
      @click="editMysite(0)"
    >
      添加
    </n-button>
    <n-input
      v-model:value="searchKey"
      size="tiny"
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
  <n-pagination
    v-if="tableRef"
    v-model:page="page"
    v-model:page-size="pageSize"
    class="absolute z-998 mt-8"
    size="small"
    :item-count="siteStatusList.length"
    show-size-picker
    :page-sizes="[6, 8, 10, 20, 30, 40, 100]"
    :page-slot="slots"
  />
  <n-space v-if="!tableRef" class="pt-58px" vertical>
    <n-card
      v-for="{ site, my_site, status, sign, level, next_level } in list"
      :key="my_site.id"
      hoverable
      embedded
    >
      <n-table :bordered="false" size="small">
        <tbody>
          <tr>
            <td class="w-20px">
              <n-button size="tiny" type="warning" ghost :bordered="false">
                <n-input-number
                  v-model:value="my_site.sort_id"
                  button-placement="both"
                  status="warning"
                  :bordered="false"
                  class="w-90px text-#3b5769"
                  size="tiny"
                  min="1"
                  max="200"
                  @update:value="handleUpdate(my_site)"
                >
                <!--                  <template #prefix> -->
                <!--                    <MenuIcon icon="SwapVerticalSharp" /> -->
                <!--                  </template> -->
                </n-input-number>
              </n-button>
            </td>
            <td class="w-100px text-center">
              <n-space justify="center" vertical>
                <n-badge :max="99" type="warning">
                  <template #value>
                    <n-button
                      v-if="status.mail > 0"
                      tag="a"
                      target="_blank" circle
                      :href="site.url + site.page_message"
                      quaternary type="error"
                      class="mr-2 absolute"
                      size="tiny" :bordered="false"
                    >
                      <!--                      <template #icon> -->
                      <!--                        <n-icon size="13"> -->
                      <!--                          <MailUnreadSharp /> -->
                      <!--                        </n-icon> -->
                      <!--                      </template> -->
                      {{ status.mail }}
                    </n-button>
                  </template>
                  <n-avatar
                    round
                    :src="site.logo"
                    class="w-14px mr-1" alt=""
                    fallback-src="/ptools.svg"
                  />
                </n-badge>
                <n-button
                  tag="a"
                  secondary strong
                  size="tiny"
                  :href="site.url"
                  target="_blank"
                  type="primary"
                >
                  <!--                <template #icon> -->
                  <!--                  <n-image -->
                  <!--                    :src="site.logo" -->
                  <!--                    class="w-14px mr-1" alt="" -->
                  <!--                    fallback-src="https://gitee.com/ngfchl/auxi-naive/raw/master/public/ptools.svg" -->
                  <!--                  /> -->
                  <!--                </template> -->
                  {{ my_site.nickname ? my_site.nickname : site.name }}
                </n-button>
              </n-space>
            </td>
            <td class="w-120px">
              <n-space vertical justify="center">
                <n-popover
                  v-if="status.my_level.length > 0"
                  placement="bottom"
                  trigger="hover"
                  :show-arrow="false"
                  :scrollable="true"
                  width="320"
                  style="max-height: 240px"
                >
                  <template #trigger>
                    <n-button
                      ghost
                      size="tiny" :bordered="false" type="primary"
                    >
                      <template #icon>
                        <n-icon>
                          <Man />
                        </n-icon>
                      </template>
                      <n-ellipsis>
                        {{ status.my_level }}
                      </n-ellipsis>
                    </n-button>
                  </template>
                  <table style="font-size: 10px;font-family: 'Heiti SC';margin-right: 5px;">
                    <tr v-if="level">
                      <th class="w-70px">
                        当前等级：
                      </th>
                      <td class="complete">
                        <n-text type="success">
                          {{ level.level }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="next_level">
                      <th class="w-70px">
                        下一等级：
                      </th>
                      <td class="incomplete">
                        <n-text type="error">
                          {{ next_level.level }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="site.upgrade_day">
                      <th>升级时间：</th>
                      <td>
                        <!--     todo: 完成升级时间的计算                   -->
                        <span
                          class="incomplete"
                          v-text="site.upgrade_day.replace('T', ' ')"
                        />
                      </td>
                    </tr>
                    <tr v-if="next_level && renderBit(next_level.uploaded) > status.uploaded">
                      <th>上传量：</th>
                      <td>
                        <n-text type="success">
                          {{ renderSize(status.uploaded) }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ renderSize(renderBit(next_level.downloaded) * next_level.ratio) }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="next_level && renderBit(next_level.downloaded) > status.downloaded">
                      <th>下载量：</th>
                      <td>
                        <n-text type="success">
                          {{ renderSize(status.downloaded) }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ next_level.downloaded }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="next_level && next_level.bonus !== 0 && next_level.bonus > status.my_bonus">
                      <th>魔力：</th>
                      <td>
                        <n-text type="success">
                          {{ numberFormat(status.my_bonus) }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ numberFormat(next_level.bonus) }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="next_level && next_level.score !== 0 && next_level.score > status.my_score">
                      <th>
                        积分：
                      </th>
                      <td>
                        <n-text type="success">
                          {{ numberFormat(status.my_score) }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ numberFormat(next_level.score) }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="status.ratio !== '∞' && next_level && next_level.ratio !== 0 && next_level.ratio > status.ratio">
                      <th>分享率：</th>
                      <td>
                        <n-text type="success">
                          {{ status.ratio }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ next_level.ratio }}
                        </n-text>
                      </td>
                    </tr>
                    <tr v-if="next_level && next_level.torrents !== 0 && next_level.torrents > (status.torrents ? status.torrents : 0)">
                      <th>
                        发种数：
                      </th>
                      <td>
                        <n-text type="success">
                          {{ status.torrents ? status.torrents : 0 }}
                        </n-text>
                        /
                        <n-text type="error">
                          {{ next_level.torrents }}
                        </n-text>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: center">
                        <h3>权益：</h3>
                      </th>
                    </tr>
                    <tr v-if="next_level">
                      <th>
                        即将拥有：
                      </th>
                      <td>
                        <n-text
                          type="error"
                          class="text-8px"
                        >
                          {{ next_level.rights }}
                        </n-text>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <th>已拥有：</th>
                      <td>
                        <div v-if="level">
                          <n-text
                            v-for="(value, index) in level.rights.split('||')"
                            :key="index"
                            type="success"
                            class="text-8px"
                            style="color: darkgreen;font-size: 8px;"
                          >
                            {{ `${index + 1}：${value.trim()}` }}
                          </n-text>
                        </div>
                        <!--                      <div v-else> -->
                        <!--                        <i -->
                        <!--                          class="el-icon-star-on" -->
                        <!--                          v-text="level.rights" -->
                        <!--                        /> -->
                        <!--                      </div> -->
                      </td>
                    </tr>
                  </table>
                </n-popover>
                <n-button strong secondary size="tiny" ghost>
                  🔥 {{ calculateWeeksAndDays(my_site.joined) }}
                </n-button>
              </n-space>
            </td>
            <td class="w-100px">
              <n-space class="items-center" vertical>
                <!--                <n-button -->
                <!--                  v-if="status.mail > 0" -->
                <!--                  tag="a" -->
                <!--                  target="_blank" -->
                <!--                  :href="site.url + site.page_message" -->
                <!--                  ghost -->
                <!--                  class="text-blue-500 mr-2 absolute" -->
                <!--                  size="tiny" :bordered="false" type="error" -->
                <!--                > -->
                <!--                  <template #icon> -->
                <!--                    <n-icon size="13"> -->
                <!--                      <MailUnreadSharp /> -->
                <!--                    </n-icon> -->
                <!--                  </template> -->
                <!--                  <n-ellipsis -->
                <!--                    :href="site.url + site.page_message" -->
                <!--                    target="_blank" -->
                <!--                  > -->
                <!--                    {{ status.mail }} -->
                <!--                  </n-ellipsis> -->
                <!--                </n-button> -->

                <n-button
                  v-if="status.invitation > 0"
                  type="success" ghost
                  size="tiny" :bordered="false"
                >
                  <template #icon>
                    <n-icon>
                      <CardSharp />
                    </n-icon>
                  </template>
                  <n-ellipsis>
                    {{ status.invitation }}
                  </n-ellipsis>
                </n-button>
                <n-button
                  v-if="String(status.my_hr).length > 0 && Number(status.my_hr) > 0"
                  class="text-blue-500 mr-2" ghost
                  size="tiny" :bordered="false" type="error"
                >
                  <!--            <br v-if="status.my_hr !== 0 || status.mail > 0"> -->
                  <template #icon>
                    <n-icon>
                      <WarningSharp />
                    </n-icon>
                  </template>

                  <n-ellipsis
                    style="color: orangered;"
                    title="H&R"
                  >
                    {{ status.my_hr }}
                  </n-ellipsis>
                </n-button>
              </n-space>
            </td>
            <td class="w-200px text-center">
              <n-space style="text-align: center;" vertical>
                <span class="items-center justify-end">
                  <n-button-group>
                    <n-button size="tiny" :bordered="false">
                      <span style="color: indianred" title="正在下载" v-text="status.leech" />
                    </n-button>
                    <n-button size="tiny" :bordered="false">
                      <template #icon>
                        <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                      </template>
                      &nbsp;
                      <span style="color: green" title="做种数量">
                        {{ status.seed }}
                      </span>
                    </n-button>
                  </n-button-group>
                </span>

                <span style="text-align: right;" class="items-center justify-end ml-1">
                  <n-button-group>
                    <n-button size="tiny" :bordered="false">
                      <span
                        style="color: indianred" title="下载量"
                        v-text="renderSize(status.downloaded)"
                      />

                    </n-button>
                    <n-button size="tiny" :bordered="false">
                      <template #icon>
                        <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                      </template>
                      &nbsp;
                      <span
                        style="color: green" title="上传量"
                        v-text="renderSize(status.uploaded)"
                      />
                    </n-button>
                  </n-button-group>
                </span>
              </n-space>
            </td>
            <td class="w-150px">
              <n-space vertical class="flex items-center justify-between">
                <n-button size="tiny" :bordered="false">
                  <template #icon>
                    <n-icon class="ml-2 mr-1">
                      <ShareSharp />
                    </n-icon>
                  </template>
                  <span style="color: saddlebrown" title="分享率">
                    {{
                      status.downloaded > 0 ? numberFormat(Number((status.uploaded / status.downloaded).toFixed(2))) : '∞'
                    }}
                  </span>
                </n-button>
                <n-divider />
                <n-button size="tiny" :bordered="false">
                  <template #icon />
                  <n-icon class="mr-1" color="deepskyblue">
                    <Cloudy />
                  </n-icon>
                  <span style="color: deepskyblue">{{ renderSize(status.seed_volume) }}</span>
                </n-button>
              </n-space>
            </td>
            <td class="w-260px">
              <n-space class="items-center justify-between text-right" vertical>
                <n-button size="tiny" :bordered="false">
                  <template #icon>
                    <n-icon>
                      <ColorWandSharp />
                    </n-icon>
                  </template>
                  时魔&nbsp;
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
                </n-button>
                <n-divider />

                <n-button size="tiny" :bordered="false">
                  <template #icon>
                    <n-icon>
                      <ColorWandOutline />
                    </n-icon>
                  </template>
                  魔力/积分 &nbsp;
                  <span
                    style="color: darkorange" title="魔力/积分"
                  >
                    <span v-text="` ${numberFormat(status.my_bonus)}`" />
                    <span v-if="status.my_score !== 0" v-text="` / ${numberFormat(status.my_score)}`" />
                  </span>
                </n-button>
              </n-space>
            </td>
            <td class="w-80px text-center">
              <n-button-group size="tiny" vertical>
                <n-button type="info" secondary @click="siteEChart(my_site.id)">
                  <template #icon>
                    <MenuIcon icon="TrendingUpOutline" size="13" />
                  </template>
                  图表
                </n-button>
                <n-button
                  v-if="my_site.get_info && site.get_info" type="error"
                  secondary @click="refreshSite(my_site.id)"
                >
                  <template #icon>
                    <MenuIcon icon="ReloadSharp" size="13" />
                  </template>
                  刷新
                </n-button>
                <!--                <n-button v-if="my_site.hr_discern && site.hr_discern" type="warning" secondary> -->
                <!--                  H&&R -->
                <!--                </n-button> -->
                <!--              <n-button v-if="my_site.brush_free && site.brush_free" type="warning" secondary> -->
                <!--                刷流 -->
                <!--              </n-button> -->
                <!--              <n-button v-if="my_site.search_torrents && site.search_torrents" type="warning" secondary> -->
                <!--                聚合 -->
                <!--              </n-button> -->
                <!--              <n-button -->
                <!--                v-if="my_site.repeat_torrents && site.repeat_torrents" type="warning" -->
                <!--                secondary -->
                <!--              > -->
                <!--                辅种 -->
                <!--              </n-button> -->

                <n-button
                  v-if="my_site.sign_in && site.sign_in && (!sign || !sign.sign_in_today)"
                  type="warning" secondary
                  @click="signSite(my_site.id)"
                >
                  <template #icon>
                    <MenuIcon size="13" icon="SquareOutline" />
                  </template>
                  签到
                </n-button>
                <n-button
                  v-if="sign && sign.sign_in_today" type="success"
                  secondary @click="getSignList(my_site.id)"
                >
                  <template #icon>
                    <MenuIcon size="13" icon="CheckboxSharp" color="green" />
                  </template>
                  签到
                </n-button>

                <!--              <n-button -->
                <!--                v-if="my_site.get_torrents && site.get_torrents" type="primary" -->
                <!--                secondary @click="updateTorrents(my_site.id)" -->
                <!--              > -->
                <!--                种子 -->
                <!--              </n-button> -->
                <!--                <n-button type="warning" secondary @click="updateMySiteStatus(my_site.id)"> -->
                <!--                  <MenuIcon icon="ReloadSharp" /> -->
                <!--                </n-button> -->
                <n-button type="error" @click="editMysite(my_site.id)">
                  <MenuIcon icon="Pencil" />
                  编辑
                </n-button>
              </n-button-group>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </n-space>

  <n-grid
    v-if="tableRef"
    cols="400:1 600:2 900:3 1200:4"
    responsive="self"
    x-gap="12"
    y-gap="8"
    class="pt-58px"
  >
    <n-gi v-if="spinShow" span="24" class="mx-auto mt-30%">
      <n-spin :show="spinShow" size="large">
        <template #description>
          你不知道你有多幸运
        </template>
      </n-spin>
    </n-gi>

    <n-gi
      v-for="{ site, my_site, status, sign, level, next_level } in list"
      :key="my_site.id"
    >
      <n-card hoverable embedded>
        <template #header>
          <n-space vertical class="text-13px flex">
            <n-space justify="start">
              <n-button
                tag="a"
                secondary strong
                size="tiny"
                :href="site.url"
                target="_blank"
                type="primary"
              >
                <template #icon>
                  <n-image
                    :src="site.logo"
                    class="w-14px mr-1" alt=""
                    fallback-src="/ptools.svg"
                  />
                </template>
                {{ my_site.nickname ? my_site.nickname : site.name }}
              </n-button>
              <!--              <n-tag -->
              <!--                v-for="tag in site.tags.split(',')" :key="tag" -->
              <!--                size="small" type="info" :bordered="false" -->
              <!--                class="ml-2 text-#3b5769" -->
              <!--              > -->
              <!--                {{ tag }} -->
              <!--              </n-tag> -->
              <n-button
                v-if="status.mail > 0"
                tag="a"
                target="_blank"
                :href="site.url + site.page_message"
                ghost
                class="text-blue-500 mr-2 absolute"
                size="tiny" :bordered="false" type="error"
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
              </n-button>
            </n-space>
            <div class="flex items-center">
              <n-popover
                v-if="status.my_level.length > 0"
                placement="bottom"
                trigger="hover"
                :show-arrow="false"
                :scrollable="true"
                width="320"
                style="max-height: 240px"
              >
                <template #trigger>
                  <n-button
                    ghost
                    size="tiny" :bordered="false" type="primary"
                  >
                    <template #icon>
                      <n-icon>
                        <Man />
                      </n-icon>
                    </template>
                    <n-ellipsis>
                      {{ status.my_level }}
                    </n-ellipsis>
                  </n-button>
                </template>
                <table style="font-size: 10px;font-family: 'Heiti SC';margin-right: 5px;">
                  <tr v-if="level">
                    <th class="w-70px">
                      当前等级：
                    </th>
                    <td class="complete">
                      <n-text type="success">
                        {{ level.level }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="next_level">
                    <th class="w-70px">
                      下一等级：
                    </th>
                    <td class="incomplete">
                      <n-text type="error">
                        {{ next_level.level }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="site.upgrade_day">
                    <th>升级时间：</th>
                    <td>
                      <!--     todo: 完成升级时间的计算                   -->
                      <span
                        class="incomplete"
                        v-text="site.upgrade_day.replace('T', ' ')"
                      />
                    </td>
                  </tr>
                  <tr v-if="next_level && renderBit(next_level.uploaded) > status.uploaded">
                    <th>上传量：</th>
                    <td>
                      <n-text type="success">
                        {{ renderSize(status.uploaded) }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ renderSize(renderBit(next_level.downloaded) * next_level.ratio) }}
                      </n-text>
                    </td>
                    downloaded
                  </tr>
                  <tr v-if="next_level && renderBit(next_level.downloaded) > status.downloaded">
                    <th>下载量：</th>
                    <td>
                      <n-text type="success">
                        {{ renderSize(status.downloaded) }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ next_level.downloaded }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="next_level && next_level.bonus !== 0 && next_level.bonus > status.my_bonus">
                    <th>魔力：</th>
                    <td>
                      <n-text type="success">
                        {{ numberFormat(status.my_bonus) }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ numberFormat(next_level.my_bonus) }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="next_level && next_level.score !== 0 && next_level.score > status.my_score">
                    <th>
                      积分：
                    </th>
                    <td>
                      <n-text type="success">
                        {{ numberFormat(status.my_score) }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ numberFormat(next_level.my_score) }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="status.ratio !== '∞' && next_level && next_level.ratio !== 0 && next_level.ratio > status.ratio">
                    <th>分享率：</th>
                    <td>
                      <n-text type="success">
                        {{ status.ratio }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ next_level.ratio }}
                      </n-text>
                    </td>
                  </tr>
                  <tr v-if="next_level && next_level.torrents !== 0 && next_level.torrents > (status.torrents ? status.torrents : 0)">
                    <th>
                      发种数：
                    </th>
                    <td>
                      <n-text type="success">
                        {{ status.torrents ? status.torrents : 0 }}
                      </n-text>
                      /
                      <n-text type="error">
                        {{ next_level.torrents }}
                      </n-text>
                    </td>
                  </tr>
                  <tr>
                    <th colspan="2" style="text-align: center">
                      <h3>权益：</h3>
                    </th>
                  </tr>
                  <tr v-if="next_level">
                    <th>
                      即将拥有：
                    </th>
                    <td>
                      <n-text
                        type="error"
                        class="text-8px"
                      >
                        {{ next_level.rights }}
                      </n-text>
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <th>已拥有：</th>
                    <td>
                      <div v-if="level">
                        <n-text
                          v-for="(value, index) in level.rights.split('||')"
                          :key="index"
                          type="success"
                          class="text-8px"
                          style="color: darkgreen;font-size: 8px;"
                        >
                          {{ `${index + 1}：${value.trim()}` }}
                        </n-text>
                      </div>
                      <!--                      <div v-else> -->
                      <!--                        <i -->
                      <!--                          class="el-icon-star-on" -->
                      <!--                          v-text="level.rights" -->
                      <!--                        /> -->
                      <!--                      </div> -->
                    </td>
                  </tr>
                </table>
              </n-popover>
              <n-button
                v-if="status.invitation > 0"
                type="success" ghost
                size="tiny" :bordered="false"
              >
                <template #icon>
                  <n-icon>
                    <CardSharp />
                  </n-icon>
                </template>
                <n-ellipsis>
                  {{ status.invitation }}
                </n-ellipsis>
              </n-button>
              <n-button
                v-if="String(status.my_hr).length > 0 && Number(status.my_hr) > 0"
                class="text-blue-500 mr-2" ghost
                size="tiny" :bordered="false" type="error"
              >
                <template #icon>
                  <n-icon>
                    <WarningSharp />
                  </n-icon>
                </template>

                <n-ellipsis
                  style="color: orangered;"
                  title="H&R"
                >
                  {{ status.my_hr }}
                </n-ellipsis>
              </n-button>
              <n-button size="tiny" type="warning" ghost :bordered="false">
                <n-input-number
                  v-model:value="my_site.sort_id"
                  button-placement="right"
                  status="warning"
                  :bordered="false"
                  class="w-100px text-#3b5769"
                  size="tiny"
                  min="1"
                  max="200"
                  @update:value="handleUpdate(my_site)"
                >
                  <template #prefix>
                    <MenuIcon icon="SwapVerticalSharp" />
                  </template>
                </n-input-number>
              </n-button>
            </div>
          </n-space>
        </template>
        <template #default>
          <div v-if="status.updated_at">
            <div class="flex items-center justify-between">
              <span class="text-#3b5769 font-bold">保种分享：</span>
              <div class="flex items-center">
                <n-button-group>
                  <n-button size="tiny" :bordered="false">
                    <template #icon />
                    <n-icon class="mr-1" color="deepskyblue">
                      <Cloudy />
                    </n-icon>
                    <span style="color: deepskyblue">{{ renderSize(status.seed_volume) }}</span>
                  </n-button>

                  <n-button size="tiny" :bordered="false">
                    <template #icon>
                      <n-icon class="ml-2 mr-1">
                        <ShareSharp />
                      </n-icon>
                    </template>
                    <span style="color: saddlebrown" title="分享率">
                      {{
                        status.downloaded > 0 ? numberFormat(Number((status.uploaded / status.downloaded).toFixed(2))) : '∞'
                      }}
                    </span>
                  </n-button>
                </n-button-group>
              </div>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="font-weight: bold;color: #3b5769;line-height: 36px">实时数据：</span>
              <span style="text-align: right;">
                <span class="flex items-center justify-end">
                  <n-button-group>
                    <n-button size="tiny" :bordered="false">
                      <span style="color: indianred" title="正在下载" v-text="status.leech" />
                    </n-button>
                    <n-button size="tiny" :bordered="false">
                      <template #icon>
                        <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                      </template>
                      <span style="color: green" title="做种数量">
                        {{ status.seed }}
                      </span>
                    </n-button>
                  </n-button-group>
                </span>
                <n-divider />
                <span style="text-align: right;" class="flex items-center justify-end">
                  <n-button-group>
                    <n-button size="tiny" :bordered="false">
                      <span
                        style="color: indianred" title="下载量"
                        v-text="renderSize(status.downloaded)"
                      />

                    </n-button>
                    <n-button size="tiny" :bordered="false">
                      <template #icon>
                        <n-icon class="ml-1 mr-1"><SwapVerticalSharp /></n-icon>
                      </template>
                      <span
                        style="color: green" title="上传量"
                        v-text="renderSize(status.uploaded)"
                      />
                    </n-button>
                  </n-button-group>
                </span>
              </span>
            </div>
            <n-divider />
            <div class="flex items-center justify-between">
              <span style="font-weight: bold;color: #3b5769;">魔力/积分：</span>
              <div class="text-right">
                <n-button size="tiny" :bordered="false">
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
                </n-button>
                <n-divider />
                <n-button size="tiny" :bordered="false">
                  <span
                    v-if="status.bonus_hour !== 0"
                    style="color: coral"
                    class="ml-1"
                    title="时魔"
                    v-text="`🕓 ${status.bonus_hour.toFixed(2)} / ${(status.bonus_hour / site.sp_full * 100).toFixed(2)}%`"
                  />
                  <span
                    v-else
                    style="color: coral"
                    title="时魔" v-text="`🕓 ${status.bonus_hour.toFixed(2)}`"
                  />
                </n-button>
              </div>
            </div>
          </div>
          <div v-else style="margin-bottom: 25px;">
            这个站点还没有数据历史记录呀，快去刷新一下吧
          </div>
          <n-divider />
          <n-space v-if="status.updated" class="text-8px text-right text-#3b5769" justify="space-between">
            <n-button strong secondary size="tiny" ghost>
              🔥 {{ calculateWeeksAndDays(my_site.joined) }}
            </n-button>

            {{ status.updated }}
          </n-space>
          <n-divider />
        </template>
        <template #action>
          <n-space justify="center" class="mt--10px mb--10px mx-auto">
            <n-button-group size="small">
              <n-button type="info" secondary @click="siteEChart(my_site.id)">
                图表
              </n-button>
              <n-button
                v-if="my_site.get_info && site.get_info" type="error"
                secondary @click="refreshSite(my_site.id)"
              >
                刷新
              </n-button>
              <n-button v-if="my_site.hr_discern && site.hr_discern" type="warning" secondary>
                H&&R
              </n-button>
              <!--              <n-button v-if="my_site.brush_free && site.brush_free" type="warning" secondary> -->
              <!--                刷流 -->
              <!--              </n-button> -->
              <!--              <n-button v-if="my_site.search_torrents && site.search_torrents" type="warning" secondary> -->
              <!--                聚合 -->
              <!--              </n-button> -->
              <!--              <n-button -->
              <!--                v-if="my_site.repeat_torrents && site.repeat_torrents" type="warning" -->
              <!--                secondary -->
              <!--              > -->
              <!--                辅种 -->
              <!--              </n-button> -->

              <n-button
                v-if="my_site.sign_in && site.sign_in && (!sign || !sign.sign_in_today)"
                type="warning" secondary
                @click="signSite(my_site.id)"
              >
                签到
              </n-button>
              <n-button
                v-if="sign && sign.sign_in_today" type="success"
                secondary @click="getSignList(my_site.id)"
              >
                签到
                <!--                <MenuIcon size="20" icon="CheckboxSharp" color="green" /> -->
              </n-button>

              <!--              <n-button -->
              <!--                v-if="my_site.get_torrents && site.get_torrents" type="primary" -->
              <!--                secondary @click="updateTorrents(my_site.id)" -->
              <!--              > -->
              <!--                种子 -->
              <!--              </n-button> -->
              <n-button type="warning" secondary @click="updateMySiteStatus(my_site.id)">
                <MenuIcon icon="ReloadSharp" />
              </n-button>
              <n-button type="error" secondary @click="editMysite(my_site.id)">
                <MenuIcon icon="Pencil" />
              </n-button>
            </n-button-group>
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
.n-divider:not(.n-divider--vertical) {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
