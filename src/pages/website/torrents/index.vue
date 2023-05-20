<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type { Torrent } from '~/api/website'

const { isMobile, isPad, isDesktop } = useQueryBreakPoints()

const websiteStore = useWebsiteStore()
const {
  torrentList, torrentColumns,
} = storeToRefs(websiteStore)

const {
  getTorrentList, getSiteList, handleUpdateSorter, getDownloaderList,
} = websiteStore

const loading = ref<Boolean>(false)
const showList = ref<Torrent[]>([])
const searchKey = ref<String>('')
const filterTorrents = async () => {
  showList.value = torrentList.value.filter((torrent: Torrent) => {
    return torrent.title.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.subtitle.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.category.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.area.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.sale_status.toLowerCase().includes(searchKey.value.toLowerCase())
  })
}
const reloadData = async () => {
  loading.value = true
  await getTorrentList()
  await filterTorrents()
  loading.value = false
}
onMounted(async () => {
  loading.value = true
  await getSiteList()
  await getDownloaderList()
  await getTorrentList()
  await filterTorrents()
  loading.value = false
})
</script>

<template>
  <n-space class="pt-2 mb-1" justify="start">
    <n-input
      v-model:value="searchKey"
      size="small"
      @update:value="filterTorrents"
    />
    <n-button
      size="small"
      type="warning"
      @click="reloadData"
    >
      刷新
    </n-button>
  </n-space>
  <n-data-table
    :columns="torrentColumns"
    :data="showList"
    :loading="loading"
    :min-height="isMobile ? 520 : 680"
    :row-key="(row: RowData) => row.id"
    bordered
    flex-height
    max-height="720"
    size="small"
    striped
    virtual-scroll
    @update:sorter="handleUpdateSorter"
  />
</template>

<style scoped>

</style>
