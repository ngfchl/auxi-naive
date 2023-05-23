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

const torrentPagination = ref({
  page: 1,
  pageSize: isMobile.value ? 20 : 33,
  size: 'small',
  showQuickJumper: true,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 25, 30, 33, 40, 100],
  pageSlot: 9,
  simple: isMobile.value,
  prefix({ itemCount }) {
    return `共 ${itemCount}.`
  },
})
const filterTorrents = async () => {
  showList.value = torrentList.value.items.filter((torrent: Torrent) => {
    return torrent.title.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.subtitle.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.category.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.area.toLowerCase().includes(searchKey.value.toLowerCase())
    || torrent.sale_status.toLowerCase().includes(searchKey.value.toLowerCase())
  })
}
const updateShowData = async (page: number, pageSize: number) => {
  loading.value = true
  await getTorrentList(page, pageSize)
  torrentPagination.value.page = torrentList.value.per_page
  torrentPagination.value.itemCount = torrentList.value.total
  await filterTorrents()
  loading.value = false
}
const handlePageSize = async (pageSize: number) => {
  torrentPagination.value.pageSize = pageSize
  await updateShowData(torrentPagination.value.page, torrentPagination.value.pageSize)
}
const handlePageChange = async (currentPage: number) => {
  await updateShowData(currentPage, torrentPagination.value.pageSize)
}
const reloadData = async () => {
  await updateShowData(torrentPagination.value.page, torrentPagination.value.pageSize)
}
onMounted(async () => {
  loading.value = true
  await getSiteList()
  await getDownloaderList()
  await updateShowData(torrentPagination.value.page, torrentPagination.value.pageSize)
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
    :min-height="isMobile ? 520 : 740"
    :paginate-single-page="true"
    :pagination="torrentPagination"
    :row-key="(row: RowData) => row.hash_string"
    bordered
    flex-height
    max-height="900"
    remote
    size="small"
    striped
    @update:page-size="handlePageSize"
    @update:page="handlePageChange"
    @update:sorter="handleUpdateSorter"
  />
</template>

<style scoped>
:deep(td) {
  padding: 1px !important;
  font-size: 11px !important;
}

:deep(th) {
  padding: 2px !important;
  font-size: 12px !important;
}
</style>
