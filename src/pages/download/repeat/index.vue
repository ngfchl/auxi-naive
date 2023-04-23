<script setup lang="ts">
import type { DropdownOption, GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, NTag } from 'naive-ui'
import type { Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

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
    label: '继续',
    key: 'resume',
    icon: () => h(MenuIcon, { icon: 'Play' }),
  },
  {
    label: '强制继续',
    key: 'set_force_start',
    icon: () => h(MenuIcon, { icon: 'PlayForward' }),
  },
  {
    label: '暂停',
    key: 'pause',
    icon: () => h(MenuIcon, { icon: 'Pause' }),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '删除',
    key: 'deleteForm',
    icon: () => h(MenuIcon, { icon: 'Trash' }),
  },
  {
    label: '分类',
    key: 'categoryForm',
    icon: () => h(MenuIcon, { icon: 'Document' }),
  },
  {
    label: '自动管理',
    key: 'set_auto_management',
    icon: () => h(MenuIcon, { icon: 'Car' }),
  },
  {
    label: '超级做种',
    key: 'set_super_seeding',
    icon: () => h(MenuIcon, { icon: 'Flash' }),
  },
  {
    type: 'divider',
    key: 'd2',
  },
  {
    label: '重新校验',
    key: 'recheck',
    icon: () => h(MenuIcon, { icon: 'CheckmarkDoneCircle' }),
  },
  {
    label: '重新汇报',
    key: 'reannounce',
    icon: () => h(MenuIcon, { icon: 'Mic' }),
  },
  {
    type: 'divider',
    key: 'd3',
  },
  {
    label: '清除',
    key: 'clear',
    icon: () => h(MenuIcon, { icon: 'CalendarClear' }),
    children: [
      {
        label: '清除排序',
        key: 'clearSort',
        icon: () => h(MenuIcon, { icon: 'SwapVertical' }),
      },
      {
        label: '清除筛选',
        key: 'clearFilter',
        icon: () => h(MenuIcon, { icon: 'Filter' }),
      },
      {
        label: '清除选中',
        key: 'clearChecked',
        icon: () => h(MenuIcon, { icon: 'Checkbox' }),
      },
    ],
  },
  {
    label: '复制',
    key: 'copy',
    icon: () => h(MenuIcon, { icon: 'Copy' }),
    children: [
      {
        label: '名称',
        key: 'name',
        icon: () => h(MenuIcon, { icon: 'Duplicate' }),
      },
      {
        label: 'HASH',
        key: 'hash',
        icon: () => h(MenuIcon, { icon: 'DuplicateOutline' }),
      },
      {
        label: '链接',
        key: 'magnet_uri',
        icon: () => h(MenuIcon, { icon: 'Magnet' }),
      },
    ],
  },
  // {
  //   label: () => h(NTag, { style: { color: 'red' } }, '删除'),
  //   key: 'delete',
  // },
]
const expandRowKeys = ref<string[] | number[]>([])
const showDropdown = ref(false)
const currentRow = ref<string[]>([])
const x = ref(0)
const y = ref(0)
const handleSelect = (key: string | number, option: DropdownOption) => {
  showDropdown.value = false
}
const onClickOutside = () => {
  showDropdown.value = false
}
const rowProps = (row: Torrent) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      message?.info(JSON.stringify(row.hash, null, 2))
      currentRow.value.length = 0
      e.preventDefault()
      currentRow.value.push(row.hash)
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
onBeforeMount(async () => {
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
      <n-space>
        <n-button size="tiny">
          filter
        </n-button>
      </n-space>
      <NConfigProvider :theme-overrides="themeOverrides">
        <n-data-table
          ref="downloadingRef"
          :columns="downloadingColumns"
          :data="downloading.torrents"
          :expanded-row-keys="expandRowKeys"
          :loading="loading"
          :max-height="720"
          :row-class-name="rowClassName"
          :row-key="rowKey"
          :row-props="rowProps"
          bordered
          class="text-10px!"
          size="small"
          sticky-expanded-rows
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
    size="small"
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
