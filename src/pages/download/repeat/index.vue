<script setup lang="ts">
import { isNaN } from 'lodash-es'
import type { DataTableRowKey, DropdownOption, SelectOption } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { Category, Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import { $controlTorrent } from '~/api/download'
import torrent from '~/pages/download/repeat/components/torrent.vue'

const {
  message,
  dialog,
} = useGlobalConfig()
const downloadStore = useDownloadStore()
const {
  handleSelected,
  getDownloaderList,
  getTorrentProp,
  handleDefaultDownloader,
  handleDelete,
  handleUpdateDownloading,
  startFresh,
  handleDeleteModal,
  clearTimer,
  handleCheckRows,
  handleDownloadLoading,
} = downloadStore
const {
  downloading,
  downloadingColumns,
  downloaderList,
  defaultDownloader,
  rightOptions,
  downloadLoading,
  categories,
  deleteFiles,
  currentCategory,
  checkedRowKeys,
  timer, deleteModal,
  downloadingTableRef,
} = storeToRefs(downloadStore)
const timeout = ref<number>(1000 * 60)
const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#d03050'
    if (focused)
      style.boxShadow = '0 0 0 2px #d0305040'
  }
  else {
    style.background = '#2080f0'
    if (focused)
      style.boxShadow = '0 0 0 2px #2080f040'
  }
  return style
}

const showDropdown = ref(false)

const currentRow = ref<Torrent>()

const x = ref(0)
const y = ref(0)

const onClickOutside = () => {
  showDropdown.value = false
}

const openTorrentInfo = async (torrent_hash: string) => {
  const torrentInfo = await getTorrentProp(defaultDownloader.value, torrent_hash)
  dialog?.info({
    title: '种子详情',
    content: () => h(
      torrent,
      {
        torrent: torrentInfo,
        downloader_id: defaultDownloader.value,
      },
    ),
    style: {
      width: '100%',
      height: '80%',
    },
    closable: true,
  })
}
const rowProps = (row: Torrent) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      // message?.info(JSON.stringify(row.hash, null, 2))
      e.preventDefault()
      currentRow.value = row
      showDropdown.value = false
      nextTick().then(() => {
        showDropdown.value = true
        x.value = e.clientX
        y.value = e.clientY
      })
    },
    onDblclick: async (e: MouseEvent) => {
      await openTorrentInfo(row.hash)
    },
  }
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
  if (row.super_seeding)
    cls = 'super-seeding'

  return cls
}

const handleSelect = async (key: string, option: DropdownOption) => {
  if (checkedRowKeys.value.length <= 0)
    checkedRowKeys.value.push(currentRow.value.hash)

  switch (key) {
    case 'prop':
      await openTorrentInfo(currentRow.value.hash)
      break
    case 'copy':
    case 'name':
    case 'hash':
    case 'magnet_uri':
      message?.warning('正在开发哦！')
      break
    case 'resume':
    case 'set_force_start':
    case 'pause':
    case 'set_auto_management':
    case 'recheck':
    case 'reannounce':
      await handleSelected(key)
      break
    case 'set_super_seeding':
      await handleSelected(
        key, '',
        false,
        !currentRow.value?.super_seeding || false,
      )
      break
    case 'deleteForm':
      handleDeleteModal(true)
      break
    case 'clearSort':
      message?.warning('正在开发哦！')
      break
    case 'clearFilter':
      message?.warning('正在开发哦！')
      break
    case 'clearCheckboxRow':
      message?.warning('正在开发哦！')
      break
    case 'clearCategory':
      await handleSelected('set_category', '')
      break
    case 'removeCategories':
      // await handleSelected('removeCategories', '')
      message?.warning('正在开发哦！')
      break
    case 'setAllCheckboxRow':
      message?.warning('正在开发哦！')
      break
    case 'filterSelect':
      message?.warning('正在开发哦！')
      break
    default:
      if (key.startsWith('setCategory')) {
        await handleSelected('set_category', key.replace('setCategory?', ''))
        break
      }
      message?.warning('正在开发哦！')
  }
  showDropdown.value = false
}
const getVisibleRows = () => {
  const visibleRows = downloadingTableRef.value.virtualBody.visibleItems
}
onBeforeMount(async () => {
  handleDownloadLoading(true)
  await getDownloaderList()
  if (downloaderList.value.length > 0) {
    handleDefaultDownloader(downloaderList.value[0].id)
    await handleUpdateDownloading(defaultDownloader.value)
    await startFresh()
  }
  else {
    message?.error('请先添加下载器，然后重试！')
  }
  handleDownloadLoading(false)
})
</script>

<template>
  <n-card hoverable embedded>
    <n-tabs
      v-model:value="defaultDownloader"
      size="small"
      type="card"
      @update:value="handleUpdateDownloading"
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
        <n-button v-if="isNaN(timer)" size="tiny" type="success" @click="startFresh">
          刷新
        </n-button>
        <n-button v-else size="tiny" type="error" @click="clearTimer">
          停止
        </n-button>
        <n-button size="tiny" type="error" @click="getVisibleRows">
          rows
        </n-button>
        <n-select
          v-model:value="currentCategory"
          filterable
          size="tiny"
          placeholder="分类"
          :options="categories"
        />
      </n-space>
      <n-data-table
        :ref="downloadingTableRef"
        :columns="downloadingColumns"
        :data="downloading.torrents"
        :loading="downloadLoading"
        :max-height="720"
        :row-class-name="rowClassName"
        :row-key="(row: Torrent) => row.hash"
        :row-props="rowProps"
        bordered
        show-on-focus
        class="text-10px!"
        size="small"
        sticky-expanded-rows
        striped
        virtual-scroll
        @update:checked-row-keys="handleCheckRows"
      />
    </div>
  </n-card>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="x"
    :y="y"
    :options="rightOptions"
    :show="showDropdown"
    :on-clickoutside="onClickOutside"
    @select="handleSelect"
  />
  <n-modal
    v-model:show="deleteModal"
    class="custom-card"
    preset="card"
    title="删除"
    size="small"
    :bordered="false"
    style="width: 300px"
    :segmented="{
      content: 'soft',
      footer: 'soft',
    } as const"
  >
    <template #header-extra>
      <MenuIcon class="text-red" icon="Trash" />
    </template>
    <n-space justify="center">
      <n-switch
        v-model:value="deleteFiles"
        :round="false"
        :rail-style="railStyle"
      >
        <template #checked>
          删除文件
        </template>
        <template #unchecked>
          保留文件
        </template>
      </n-switch>
    </n-space>
    <template #footer>
      <n-space justify="center">
        <n-button type="info" @click="deleteModal = false">
          取消
        </n-button>
        <n-button type="error" @click="handleDelete">
          删除
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>
:deep(.tracker-error td) {
    background-color: rgba(255, 69, 0, 0.85) !important;
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

:deep(.super-seeding td) {
    background-color: rgba(119, 228, 167, 0.85) !important;
}
</style>
