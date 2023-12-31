<script setup lang="ts">
import { useClipboard as useClipboards } from '@v-c/utils'
import { storeToRefs } from 'pinia'
import type { SearchResult, SearchTorrent } from '~/api/website'
import { useGlobalConfig } from '~/composables/gobal-config'
import renderSize from '~/hooks/renderSize'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const { copy } = useClipboards()
const {
  isMobile,
  isPad,
  isDesktop,
} = useQueryBreakPoints()
const { message } = useGlobalConfig()
const websiteStore = useWebsiteStore()

const {
  mySiteList,
  siteList,
} = storeToRefs(websiteStore)

const {
  getMySiteList,
  searchTorrent,
  getSiteList,
} = websiteStore
const downloaderStore = useDownloadStore()
const { downloaderList } = storeToRefs(downloaderStore)
const {
  getDownloaderList,
  pushTorrent,
} = downloaderStore
const key = ref('')
const site_list = ref<number[]>([])
const results = ref<SearchTorrent[]>([])
const websites = ref<{
  siteName: string | undefined
  siteLogo: string | undefined
  siteId: number
  total: number
}[]>([])
const active = ref(false)
const baseResult = {
  results: [],
  warning: [],
  success: [],
}
const searchResult = ref<SearchResult>({ ...baseResult })

const torrentPagination = ref({
  page: 1,
  pageSize: isMobile.value ? 20 : 25,
  showQuickJumper: true,
  pageSizes: [10, 20, 25, 30, 40],
  pageSlot: isMobile.value ? 5 : 11,
  simple: isMobile.value,
})

const handleSearch = async (filters) => {
  const websitesDict = siteList.value.reduce((dict, website) => ({
    ...dict,
    [website.id]: website,
  }), {})

  results.value = searchResult.value.results
    .filter(result =>
      !filters
          || Object.entries(filters).every(([field, value]) => !value || result[field] === value),
    )
    .map(result => ({
      ...result,
      siteName: websitesDict[result.site_id]?.name,
      siteLogo: websitesDict[result.site_id]?.logo,
    }))
}

const showList = computed(() => {
  const start = (torrentPagination.value.page - 1) * torrentPagination.value.pageSize
  const end = start + torrentPagination.value.pageSize
  return results.value.slice(start, end)
})

const search_sites = computed(() => {
  return mySiteList.value.filter(item => item.search_torrents)
})

const loading = ref(false)
const showSiteList = ref(false)

const handleSelect = async (key: string) => {
  await pushTorrent(key)
}
const openDrawer = async () => {
  await getMySiteList()
  await getSiteList()
  await getDownloaderList()
  active.value = true
}
const ws = ref<WebSocket | null>(null)
const openWsSearch = async (callback: { (): void; (): void }) => {
  // 处理WS相对路径
  const wsUrl = new URL('/api/ws/search', window.location.href)
  // wsUrl.protocol = wsUrl.protocol.replace('http', 'ws')
  wsUrl.protocol = 'ws:'
  ws.value = new WebSocket(wsUrl.href)
  // ws.value = new WebSocket('ws://127.0.0.1:8000/api/ws/search')
  ws.value.onopen = () => {
    callback() // WebSocket连接成功后执行回调函数
  }
  ws.value.onclose = () => {
    loading.value = false
  }
  let count = 0
  ws.value.onmessage = async (event) => {
    const result = JSON.parse(event.data)
    count += 1
    if (result.code === 0) {
      Array.prototype.push.apply(searchResult.value.results, result.data.torrents)
      searchResult.value.success.push(result.msg)
      const website = siteList.value.find(item => item.id = result.data.site)
      websites.value.push({
        siteId: result.data.site,
        siteName: website?.name,
        siteLogo: website?.logo,
        total: result.data.torrents.length,
      })
    }
    else {
      searchResult.value.warning.push(result.msg)
    }
    if (count >= site_list.value.length)
      loading.value = false

    await handleSearch(null)
  }
}

onUnmounted(() => {
  if (ws.value)
    ws.value.close()
})
const cancelSearch = () => {
  loading.value = false
  if (ws.value) {
    ws.value.close()
    ws.value = null
  }
}
const sendData = () => {
  searchResult.value = { ...baseResult }
  loading.value = true
  if (!ws.value) {
    openWsSearch(() => {
      // WebSocket连接成功后执行发送操作
      ws.value?.send(JSON.stringify({
        key: key.value,
        site_list: site_list.value,
      }))
    })
  }
  else {
    ws.value.send(JSON.stringify({
      key: key.value,
      site_list: site_list.value,
    }))
  }
}
</script>

<template>
  <!--  <n-input round placeholder="搜索" size="small" class="mb-10px!" @focus="openDrawer"> -->
  <!--    <template #suffix> -->
  <!--      <MenuIcon icon="Search" size="22" class="cursor-pointer" /> -->
  <!--    </template> -->
  <!--  </n-input> -->
  <MenuIcon icon="Search" size="22" class="cursor-pointer" @click="openDrawer" />
  <n-drawer
    v-model:show="active"
    placement="top"
    height="100%"
    :trap-focus="false"
    @focus="openWsSearch"
  >
    <n-drawer-content :title="`正在搜索：${key}`" closable>
      <n-space vertical class="mt--2">
        <n-space justify="space-between">
          <n-switch v-model:value="showSiteList" size="small" :round="false">
            <template #checked>
              站点
            </template>
            <template #unchecked>
              站点
            </template>
          </n-switch>
          <n-space justify="end">
            <n-input
              v-model:value="key"
              :loading="loading"
              maxlength="64"
              placeholder="无输入拉取第一页种子"
              size="tiny"
              show-count
              autofocus
              clearable
              @keyup.enter="sendData"
            />
            <n-button v-if="loading" type="warning" size="small" ghost @click="cancelSearch">
              取消
            </n-button>
            <n-button v-else type="success" size="small" ghost @click="sendData">
              搜索
            </n-button>
          </n-space>
        </n-space>

        <n-collapse-transition size="small" hoverable embedded class="mt-1" :show="showSiteList">
          <n-checkbox-group v-model:value="site_list">
            <n-space item-style="display: flex;" align="center">
              <n-checkbox
                v-for="my_site in search_sites" :key="my_site.id" :value="my_site.id"
                :label="my_site.nickname"
              />
            </n-space>
          </n-checkbox-group>
        </n-collapse-transition>
      </n-space>
      <n-collapse default-expanded-names="1" accordion class="mt-2" arrow-placement="right">
        <n-collapse-item v-if="(searchResult.success.length + searchResult.warning.length) > 0" name="2">
          <template #header>
            <n-text type="error">
              无结果或出错信息
            </n-text>
          </template>
          <n-space vertical>
            <n-space v-if="searchResult.success.length > 0" vertical>
              <n-tag
                v-for="(success, index) in searchResult.success"
                :key="index" type="success" size="small"
              >
                {{ success }}
              </n-tag>
            </n-space>
            <n-space v-if="searchResult.warning.length > 0" vertical>
              <n-tag
                v-for="(warning, index) in searchResult.warning"
                :key="index" type="warning" size="small"
              >
                {{ warning }}
              </n-tag>
            </n-space>
          </n-space>
        </n-collapse-item>
      </n-collapse>
      <!--      <n-collapse default-expanded-names="1" accordion class="mt-2" arrow-placement="right"> -->
      <!--        <n-collapse-item name="1" title="选择站点"> -->
      <!--          <template #header-extra> -->
      <!--            <n-space justify="end" class="mt&#45;&#45;2"> -->
      <!--              <n-input -->
      <!--                v-model:value="key" -->
      <!--                maxlength="64" -->
      <!--                placeholder="无输入拉取第一页种子" -->
      <!--                size="small" -->
      <!--                show-count -->
      <!--                autofocus -->
      <!--                clearable -->
      <!--                @keyup.enter="sendData" -->
      <!--              /> -->
      <!--              <n-button v-if="loading" type="warning" size="small" ghost :loading="loading" @click="cancelSearch"> -->
      <!--                取消 -->
      <!--              </n-button> -->
      <!--              <n-button v-else type="success" size="small" ghost @click="sendData"> -->
      <!--                搜索 -->
      <!--              </n-button> -->
      <!--            </n-space> -->
      <!--          </template> -->
      <!--          <n-card size="small" hoverable embedded class="mt-1"> -->
      <!--            <n-checkbox-group v-model:value="site_list"> -->
      <!--              <n-space item-style="display: flex;" align="center"> -->
      <!--                <n-checkbox -->
      <!--                  v-for="my_site in search_sites" :key="my_site.id" :value="my_site.id" -->
      <!--                  :label="my_site.nickname" -->
      <!--                /> -->
      <!--              </n-space> -->
      <!--            </n-checkbox-group> -->
      <!--          </n-card> -->
      <!--        </n-collapse-item> -->
      <!--        <n-collapse-item v-if="(searchResult.success.length + searchResult.warning.length) > 0" name="2"> -->
      <!--          <template #header> -->
      <!--            <n-text type="error"> -->
      <!--              无结果或出错信息 -->
      <!--            </n-text> -->
      <!--          </template> -->
      <!--          <n-space vertical> -->
      <!--            <n-space v-if="searchResult.success.length > 0" vertical> -->
      <!--              <n-tag -->
      <!--                v-for="(success, index) in searchResult.success" -->
      <!--                :key="index" type="success" size="small" -->
      <!--              > -->
      <!--                {{ success }} -->
      <!--              </n-tag> -->
      <!--            </n-space> -->
      <!--            <n-space v-if="searchResult.warning.length > 0" vertical> -->
      <!--              <n-tag -->
      <!--                v-for="(warning, index) in searchResult.warning" -->
      <!--                :key="index" type="warning" size="small" -->
      <!--              > -->
      <!--                {{ warning }} -->
      <!--              </n-tag> -->
      <!--            </n-space> -->
      <!--          </n-space> -->
      <!--        </n-collapse-item> -->
      <!--      </n-collapse> -->

      <n-pagination
        v-if="results.length > 0"
        v-model:page="torrentPagination.page"
        v-model:page-size="torrentPagination.pageSize"
        class="z-998 mt-1"
        size="small"
        :item-count="results.length"
        show-size-picker
        :page-sizes="torrentPagination.pageSizes"
        :page-slot="torrentPagination.pageSlot"
      >
        <template #prefix="{ itemCount }">
          共 {{ itemCount }} 项
        </template>
      </n-pagination>
      <n-card v-if="showList.length > 0" size="small" hoverable class="mt-1">
        <n-card v-for="(torrent, index) in showList" :key="index" size="small" hoverable class="mt-1">
          <n-thing>
            <template #avatar>
              <n-space vertical>
                <n-badge :value="torrent.siteName!" :offset="[-20, 36]" type="info">
                  <n-avatar
                    size="large" round :src="torrent.poster_url ? torrent.poster_url : torrent.siteLogo"
                    fallback-src="/ptools.svg"
                  />
                </n-badge>
              </n-space>
            </template>
            <template #header>
              <n-button
                text type="primary"
                target="_blank" size="small" tag="a" :href="torrent.detail_url"
              >
                <n-ellipsis :style="isMobile ? 'max-width: 240px' : 'max-width: 100%'">
                  {{ torrent.title }}
                </n-ellipsis>
              </n-button>
            </template>
            <template #header-extra />
            <template #description>
              <n-space justify="space-between">
                <n-space justify="start" vertical>
                  <n-space>
                    <n-button v-if="torrent.subtitle" size="tiny" secondary>
                      <n-ellipsis :style="isMobile ? 'max-width: 240px' : 'max-width: 100%'">
                        {{ torrent.subtitle }}
                      </n-ellipsis>
                    </n-button>
                  </n-space>
                  <n-space>
                    <n-tag v-if="torrent.category" size="small" type="primary" secondary>
                      {{ torrent.category }}
                    </n-tag>
                    <n-tag size="small" type="success" ghost>
                      <span v-text="renderSize(torrent.size)" />
                    </n-tag>
                    <n-tooltip v-if="torrent.sale_status" trigger="hover">
                      <template #trigger>
                        <n-button size="tiny" color="#8a2be2" secondary>
                          {{ torrent.sale_status }}
                        </n-button>
                      </template>
                      <span v-if="torrent.sale_expire">
                        {{ torrent.sale_expire }}
                      </span>
                      <span v-else>未知</span>
                    </n-tooltip>
                    <n-tag v-if="!torrent.hr" type="error" size="small">
                      HR
                    </n-tag>
                  </n-space>
                </n-space>
                <n-space justify="end" vertical>
                  <n-space justify="end">
                    <n-button size="tiny" type="info" ghost>
                      发布于：<span v-text="torrent.published" />
                    </n-button>
                  </n-space>
                  <n-space justify="end">
                    <n-button size="tiny" type="success" secondary>
                      <template #icon>
                        <MenuIcon icon="ArrowUpCircleSharp" />
                      </template>
                      {{ torrent.seeders }}
                    </n-button>
                    <n-button size="tiny" type="error" secondary>
                      <template #icon>
                        <MenuIcon icon="ArrowDownCircle" />
                      </template>
                      {{ torrent.leechers }}
                    </n-button>
                    <n-button size="tiny" type="info" secondary>
                      <template #icon>
                        <MenuIcon icon="CheckmarkCircle" />
                      </template>
                      {{ torrent.completers }}
                    </n-button>
                    <n-button
                      text
                      tag="a"
                      :href="torrent.magnet_url"
                      target="_blank"
                      type="primary"
                      size="tiny"
                    >
                      <template #icon>
                        <MenuIcon icon="DownloadOutline" />
                      </template>
                      下载种子
                    </n-button>
                    <n-button size="tiny" type="info" secondary @click="copy(torrent.magnet_url)">
                      <template #icon>
                        <MenuIcon icon="CopyOutline" />
                      </template>
                      复制链接
                    </n-button>
                    <n-dropdown
                      placement="bottom-start"
                      trigger="click"
                      size="small"
                      :options="downloaderList.map(item => ({
                        label: item.name,
                        key: `downloader_id=${item.id}&site=${torrent.site_id}&url=${torrent.magnet_url}&category=${torrent.category}`,
                      }))"
                      @select="handleSelect"
                    >
                      <n-button size="tiny" type="warning" secondary>
                        下载到
                      </n-button>
                    </n-dropdown>
                  </n-space>
                </n-space>
              </n-space>
            </template>
          </n-thing>
        </n-card>
      </n-card>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
