<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import type { SearchResult } from '~/api/website'
import renderSize from '~/hooks/renderSize'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const websiteStore = useWebsiteStore()

const {
  mySiteList, siteList,
} = storeToRefs(websiteStore)

const {
  getMySiteList, searchTorrent, getSiteList,
} = websiteStore
const key = ref('')
const site_list = ref<number[]>([])
const results = ref([])
const active = ref(false)
const inputInstRef = ref<InputInst | null>(null)
const searchResult = ref<SearchResult>({
  results: [],
  warning: [],
  error: [],
})

const handleSearch = async () => {
  searchResult.value = await searchTorrent(key.value, site_list.value)

  const websitesDict = siteList.value.reduce((dict, website) => {
    dict[website.id] = website
    return dict
  }, {})

  results.value = searchResult.value.results.map((result) => {
    const website = websitesDict[result.site]
    if (website) {
      // 使用 Object.assign 或者展开操作符来创建一个新的对象
      return {
        ...result,
        siteName: website.name,
        siteLogo: website.logo,
      }
    }
    else {
      // 如果没有找到对应的站点，返回原始的 result 对象
      return result
    }
  })
}
const openDrawer = async () => {
  await getMySiteList()
  await getSiteList()
  inputInstRef.value?.focus()
  active.value = true
}
</script>

<template>
  <div>
    <n-input @focus="openDrawer" />
  </div>
  <n-drawer
    v-model:show="active"
    placement="top"
    height="100%"
    :trap-focus="false"
  >
    <n-drawer-content :title="`正在搜索：${key}`" closable>
      <n-space justify="start">
        <n-input
          v-model:value="key"
          maxlength="64"
          placeholder="输入搜索"
          size="small"
          show-count
          autofocus
          clearable
        />
        <n-button type="success" size="small" ghost @click="handleSearch">
          搜索
        </n-button>
      </n-space>
      <n-card size="small" hoverable embedded class="mt-1">
        <n-checkbox-group v-model:value="site_list">
          <n-space item-style="display: flex;" align="center">
            <n-checkbox v-for="my_site in mySiteList" :key="my_site.id" :value="my_site.id" :label="my_site.nickname" />
          </n-space>
        </n-checkbox-group>
      </n-card>

      <n-card size="small" hoverable class="mt-1">
        <n-card v-for="(torrent, index) in results" :key="index" size="small" hoverable class="mt-1">
          <n-thing>
            <template #avatar>
              <n-avatar>
                <n-image
                  width="100"
                  :src="torrent.poster_url ? torrent.poster_url : torrent.siteLogo"
                />
              </n-avatar>
            </template>
            <template #header>
              <n-button
                text type="primary"
                target="_blank" size="small" tag="a" :href="torrent.detail_url"
              >
                <n-ellipsis style="max-width: 240px">
                  {{ torrent.title }}
                </n-ellipsis>
              </n-button>
            </template>
            <template #header-extra />
            <template #description>
              <n-button size="tiny" secondary>
                <n-ellipsis style="max-width: 240px">
                  {{ torrent.subtitle }}
                </n-ellipsis>
              </n-button>
            </template>

            <template #footer>
              <n-tag v-if="torrent.sale_status" size="small" type="success">
                {{ torrent.sale_status }}
              </n-tag>
              <n-tag v-if="torrent.sale_expire" size="small" type="success">
                {{ torrent.sale_expire }}
              </n-tag>
              <n-tag size="small" type="warning" secondary>
                {{ torrent.category }}
              </n-tag>
              <n-tag size="small" type="success" secondary>
                <span v-text="renderSize(torrent.size)" />
              </n-tag>
              <n-tag v-if="torrent.hr" type="error" size="small">
                HR
              </n-tag>
            </template>
            <template #action>
              <n-space>
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
                <n-button type="warning" secondary target="_blank" size="tiny" tag="a" :href="torrent.magnet_url">
                  下载（假的，不能点哟）
                </n-button>
                <n-button size="tiny" type="success" secondary>
                  发布于：<span v-text="torrent.published" />
                </n-button>
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
