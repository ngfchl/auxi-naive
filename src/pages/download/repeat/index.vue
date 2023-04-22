<script setup lang="ts">
import type { DropdownOption, GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import type { Torrent } from '~/api/download'

const themeOverrides: GlobalThemeOverrides = {
  DataTable: {
    paginationMargin: '40px 0 0 0',
    peers: {
      Empty: {
        textColor: '#cc1a1a',
      },
      Pagination: {
        itemTextColor: '#ccc',
      },
    },
  },
  // ...
}
const { message } = useGlobalConfig()
const downloadStore = useDownloadStore()
const {
  getDownloading,
  getDownloaderList,
  getTorrentProp,
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
const expandRowKeys = ref<string[]>([])
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
const rowClassName = (row: Torrent) => {
  const trackers = row.trackers
  let cls = ''
  if (trackers && trackers.length > 0) {
    switch (trackers[0].status) {
      case 0:
      case 4:
        cls = 'tracker-error'
        break
      case 1:
      case 3:
        cls = 'tracker-warning'
        break
    }
  }
  return cls
}
const handleExpandedRowKeys = async (keys: Array<string>) => {
  if (keys.length === 1) {
    await getTorrentProp(defaultDownloader.value, keys[0])
    expandRowKeys.value = keys
  }
  else {
    expandRowKeys.value = []
  }
}

onMounted(async () => {
  loading.value = true
  await getDownloaderList()
  if (downloaderList.value.length > 0) {
    const downloader_id = downloaderList.value[0].id
    defaultDownloader.value = downloader_id
    await getDownloading(downloader_id)
  }
  else {
    message?.error('请先添加下载器，然后重试！')
  }
  loading.value = false
})
</script>

<template>
  <n-card hoverable embedded>
    <n-tabs
      v-model:value="defaultDownloader"
      justify-content="space-around"
      size="small"
      type="card"
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
      <NConfigProvider :theme-overrides="themeOverrides">
        <n-data-table
          ref="downloadingRef"
          :columns="downloadingColumns"
          :data="downloading.torrents"
          :loading="loading"
          :max-height="750"
          :row-class-name="rowClassName"
          :row-key="rowKey"
          :row-props="rowProps"
          :expanded-row-keys="expandRowKeys"
          sticky-expanded-rows
          bordered
          class="text-10px!"
          size="small"
          striped
          virtual-scroll
          @update:expanded-row-keys="handleExpandedRowKeys"
        />
      </NConfigProvider>
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
:deep(.tracker-error td) {
    background-color: rgba(255, 0, 0, 0.85) !important;
}
:deep(td) {
    padding: 1px !important;
    font-size: 8px !important;
}
:deep(th) {
    padding: 1px !important;
    font-size: 8px !important;
}
:deep(.tracker-warning td) {
    background-color: rgba(246, 181, 15, 0.85) !important;
}
</style>
