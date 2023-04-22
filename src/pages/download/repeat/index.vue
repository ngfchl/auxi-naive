<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { Torrent } from '~/api/download'

const { message } = useGlobalConfig()
const downloadStore = useDownloadStore()
const {
  getDownloading,
  getDownloaderList,
} = downloadStore
const {
  downloading,
  downloadingColumns,
  downloaderList,
} = storeToRefs(downloadStore)
const loading = ref(false)
const rowKey = (row: Torrent) => row.hash
const defaultDownloader = ref<number>(0)
const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit',
  },
  {
    label: () => h('span', { style: { color: 'red' } }, '删除'),
    key: 'delete',
  },
]
const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const handleSelect = () => {
  showDropdown.value = false
}
const onClickOutside = () => {
  showDropdown.value = false
}
const rowProps = (row: Torrent) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      message?.info(JSON.stringify(row.hash, null, 2))
      e.preventDefault()
      showDropdown.value = false
      nextTick().then(() => {
        showDropdown.value = true
        x.value = e.clientX
        y.value = e.clientY
      })
    },
  }
}

const handleUpdateValue = async (value: number) => {
  loading.value = true
  await getDownloading(value)
  loading.value = false
}
onMounted(async () => {
  loading.value = true
  await getDownloaderList()
  const downloader_id = downloaderList.value[0].id
  defaultDownloader.value = downloader_id
  await getDownloading(downloader_id)
  loading.value = false
})
</script>

<template>
  <n-card hoverable embedded>
    <n-tabs
      v-model:value="defaultDownloader"
      :tabs-padding="20"
      justify-content="space-around"
      pane-style="padding: 20px;"
      size="small"
      type="line"
      @update:value="handleUpdateValue"
    >
      <n-tab
        v-for="downloader in downloaderList"
        :key="downloader.id"
        :name="downloader.id"
        :tab="downloader.name"
      />
    </n-tabs>

    <div style="height: 100%;">
      <n-data-table
        :columns="downloadingColumns"
        :data="downloading.torrents"
        :loading="loading"
        :max-height="750"
        :row-key="rowKey"
        :row-props="rowProps"
        bordered
        class="text-8px!"
        size="small"
        striped
      />
    </div>
  </n-card>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickOutside"
    @select="handleSelect"
  />
</template>

<style scoped>
</style>
