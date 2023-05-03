<script setup lang="ts">
import { isNaN } from 'lodash-es'
import type { DataTableColumns, DataTableCreateSummary, DropdownOption, FormInst } from 'naive-ui'
import type { CSSProperties } from 'vue'
import { useClipboard } from '@v-c/utils'
import { NTag } from 'naive-ui'
import renderSize from '../../../hooks/renderSize'
import type { Category, NewTorrent, Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import torrent from '~/pages/download/repeat/components/torrent.vue'
import { useQueryBreakPoints } from '~/composables/query-breakpoints'

const { copy } = useClipboard()
const {
  message,
  dialog,
} = useGlobalConfig()
const downloadStore = useDownloadStore()
const {
  handleSelected,
  addTorrent,
  getDownloaderList,
  getTorrentProp,
  handleDefaultDownloader,
  handleDelete,
  handleUpdateDownloading,
  startFresh,
  handleDeleteModal,
  clearTimer,
  handleCheckRows,
  removeBrush,
  handleDownloadLoading,
  searchTorrent,
} = downloadStore
const {
  torrentList,
  qBitTorrentColumns,
  transmissionColumns,
  downloaderList,
  downloaderSpeed,
  defaultDownloader,
  categoryFlag,
  qbHandleOptions,
  trHandleOptions,
  downloadLoading,
  categories,
  deleteFiles,
  currentCategory,
  showTorrentList,
  checkedRowKeys,
  timer, deleteModal,
  downloadingTableRef,
  searchKey,
  addTorrentRules,
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
    style.background = '#1fcc6b'
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
const { isMobile, isPad, isDesktop } = useQueryBreakPoints()
const currentRow = ref<Torrent>()
const pagination = ref({
  pageSize: isMobile.value ? 20 : 25,
  size: 'small',
  showQuickJumper: true,
  itemCount: torrentList.value.length,
  showSizePicker: true,
  pageSizes: [10, 20, 25, 30, 40],
  pageSlot: 5,
  simple: isMobile.value,
})
watchEffect(() => {
  // if (isPad.value || isDesktop.value) pagination.value.pageSize = 25

  // if (isMobile.value) pagination.value.pageSize = 20
  // if (defaultDownloader.value.category === 'Qb')
  //   categoryFlag.value = true
  // if (defaultDownloader.value.category === 'Tr')categoryFlag.value = false
})
const x = ref(0)
const y = ref(0)
const showAddModal = ref(false)
const onClickOutside = () => {
  showDropdown.value = false
}
const handlePageSize = (pageSize: number) => {
  pagination.value.pageSize = pageSize
}
const openTorrentInfo = async (torrent_hash: string) => {
  handleCheckRows([torrent_hash])
  const torrentInfo = await getTorrentProp(defaultDownloader.value!.id, torrent_hash)
  dialog?.info({
    title: '种子详情',
    content: () => h(
      torrent,
      {
        torrent: torrentInfo,
        downloader_id: defaultDownloader.value!.id,
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
    // onClick: async (e: MouseEvent) => {
    //   if (checkedRowKeys.value.includes(row.hash)) {
    //     const index = checkedRowKeys.value.findIndex((key: string) => key === row.hash)
    //     handleCheckRows(checkedRowKeys.value.splice(index, 1))
    //   }
    //   else { checkedRowKeys.value.push(row.hash) }
    // },
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

  return `${cls}`
}
const copyTorrentsProp = async (torrent_hashes: string[], key: 'name' | 'magnet_uri' | 'hash') => {
  let props = ''
  if (key === 'hash') {
    props = torrent_hashes.join('\n')
  }
  else {
    const items = torrentList.value.filter((item: Torrent) => torrent_hashes.includes(item.hash))
    props = items.map((item: Torrent) => item[key]).join('\n')
  }
  await copy(props)
}
const handleSelect = async (key: string, option: DropdownOption) => {
  if (checkedRowKeys.value.length <= 0)
    checkedRowKeys.value.push(currentRow.value!.hash)

  switch (key) {
    case 'prop':
      await openTorrentInfo(currentRow.value!.hash)
      break
    case 'copy':
    case 'name':
      await copyTorrentsProp(checkedRowKeys.value, 'name')
      break
    case 'hash':
      await copyTorrentsProp(checkedRowKeys.value, 'hash')
      break
    case 'magnet_uri':
      await copyTorrentsProp(checkedRowKeys.value, 'magnet_uri')
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
      downloadingTableRef.value?.clearSorter()
      break
    case 'clearFilter':
      downloadingTableRef.value?.clearFilters()
      break
    case 'clearChecked':
      checkedRowKeys.value.length = 0
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
      await handleSelected(key)
  }
  showDropdown.value = false
}
const newTorrent = ref<NewTorrent>({
  urls: '',
  category: '',
  cookie: '',
  is_paused: false,
  upload_limit: 0,
  download_limit: 0,
  is_skip_checking: false,
  use_auto_torrent_management: true,
})

const cancelDownload = () => {
  showAddModal.value = false
  newTorrent.value.urls = ''
}
const addTorrentForm = ref<FormInst>()

const handleDownload = async () => {
  await addTorrentForm.value?.validate()
  const flag = await addTorrent(
    defaultDownloader.value!.id,
    newTorrent.value,
  )
  if (flag) cancelDownload()
}

onBeforeMount(async () => {
  await getDownloaderList()
  if (downloaderList.value.length > 0) {
    await handleDefaultDownloader(downloaderList.value[0].id)
    await handleUpdateDownloading(defaultDownloader.value!.id)
    await searchTorrent()
  }
  else {
    message?.error('请先添加下载器，然后重试！')
  }
})
onBeforeUnmount(async () => {
  await clearTimer()
})
</script>

<template>
  <n-card hoverable embedded>
    <n-tabs
      v-model:value="defaultDownloader.id"
      size="small"
      type="card"
      @update:value="handleUpdateDownloading"
    >
      <n-tab
        v-for="downloader in downloaderList"
        :key="downloader.id"
        :name="downloader.id"
        :tab="downloader.name"
      >
        <n-image
          width="13"
          class="mr-1"
          :src="downloader.category === 'Qb' ? '/images/qb32.png' : '/images/tr.png'"
          preview-disabled
        />
        {{ downloader.name }}
      </n-tab>
    </n-tabs>

    <div style="height: 100%;">
      <n-space justify="end">
        <n-collapse accordion>
          <n-collapse-item title="" name="1">
            <template #header-extra>
              <n-space v-if="downloaderSpeed">
                <!--          <n-tag type="primary" size="small"> -->
                <!--            {{ downloaderSpeed.connection_status }} -->
                <!--          </n-tag> -->
                <!--          <n-tag type="primary" size="small"> -->
                <!--            {{ downloaderSpeed.category }} -->
                <!--          </n-tag> -->
                <NTag type="success" size="small">
                  ↑{{
                    renderSize(downloaderSpeed?.up_info_speed)
                  }}/s（{{ renderSize(downloaderSpeed?.up_info_data) }}）
                </NTag>
                <NTag type="warning" size="small">
                  ↓{{
                    renderSize(downloaderSpeed?.dl_info_speed)
                  }}/s({{ renderSize(downloaderSpeed?.dl_info_data) }})
                </NTag>
              </n-space>
            </template>
            <n-space>
              <NTag type="primary" size="small">
                剩余空间： {{ renderSize(downloaderSpeed?.free_space_on_disk) }}
              </NTag>
              <NTag type="primary" size="small">
                种子数量： {{ torrentList.length }}
              </NTag>
              <NTag type="primary" size="small">
                做种体积： {{
                  renderSize(torrentList.reduce((prevValue, row) => prevValue + row.size,
                                                0))
                }}
              </NTag>
            </n-space>
          </n-collapse-item>
        </n-collapse>
        <n-button v-if="timer" size="tiny" type="error" @click="clearTimer">
          停止
        </n-button>
        <n-button v-else size="tiny" type="success" @click="startFresh">
          刷新
        </n-button>
        <!--        <n-select -->
        <!--          v-if="isMobile" -->
        <!--          v-model:value="currentCategory" -->
        <!--          filterable -->
        <!--          size="tiny" -->
        <!--          placeholder="分类" -->
        <!--          :options="categories" -->
        <!--        /> -->
        <n-input v-model:value="searchKey" size="tiny" @change="searchTorrent" />
        <n-button
          size="tiny" type="info" secondary
          @click="handleUpdateDownloading(defaultDownloader.id)"
        >
          <template #icon>
            <MenuIcon icon="Reload" />
          </template>
        </n-button>
        <n-button
          size="tiny" type="primary"
          @click="showAddModal = true"
        >
          <template #icon>
            <MenuIcon icon="AddOutline" />
          </template>
        </n-button>
        <n-button
          v-if="categoryFlag"
          size="tiny" type="error"
          @click="removeBrush"
        >
          <template #icon>
            <MenuIcon icon="AddOutline" />
          </template>
          刷流删种
        </n-button>
        <n-button
          tag="a"
          :href="`${defaultDownloader.host && defaultDownloader.host.startsWith('http') ? '' : 'http://'}${defaultDownloader.host}:${defaultDownloader.port}`"
          target="_blank"
          secondary
          type="warning"
          size="tiny"
        >
          访问
        </n-button>
      </n-space>
      <n-data-table
        ref="downloadingTableRef"
        :columns="categoryFlag ? qBitTorrentColumns : transmissionColumns"
        :data="showTorrentList"
        :loading="downloadLoading"
        :min-height="isMobile ? 520 : 680"
        :paginate-single-page="false"
        :pagination="pagination"
        :row-class-name="rowClassName"
        :row-key="(row: Torrent) => row.hash"
        :row-props="rowProps"
        bordered
        flex-height
        max-height="720"
        size="small"
        striped
        virtual-scroll
        @update:page-size="handlePageSize"
        @update:checked-row-keys="handleCheckRows"
      />
      <!--      <n-data-table -->
      <!--        v-else -->
      <!--        ref="downloadingTableRef" -->
      <!--        :columns="transmissionColumns" -->
      <!--        :data="showTorrentList" -->
      <!--        :loading="downloadLoading" -->
      <!--        :pagination="pagination" -->
      <!--        :row-class-name="rowClassName" -->
      <!--        :paginate-single-page="false" -->
      <!--        :row-key="row => row.hash" -->
      <!--        :row-props="rowProps" -->
      <!--        bordered -->
      <!--        flex-height -->
      <!--        max-height="720" -->
      <!--        :min-height="isMobile ? 520 : 680" -->
      <!--        size="small" -->
      <!--        striped -->
      <!--        virtual-scroll -->
      <!--        @update:page-size="handlePageSize" -->
      <!--        @update:checked-row-keys="handleCheckRows" -->
      <!--      /> -->
    </div>
  </n-card>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="x"
    :y="y"
    :options="categoryFlag ? qbHandleOptions : trHandleOptions"
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
  <n-modal
    v-model:show="showAddModal"
    class="custom-card"
    preset="card"
    title="添加种子"
    size="small"
    :bordered="false"
    style="width: 300px"
    :segmented="{
      content: 'soft',
      footer: 'soft',
    } as const"
    @beforeLeave="cancelDownload"
  >
    <template #header-extra>
      <MenuIcon class="text-green" icon="AddOutline" />
    </template>
    <n-space vertical>
      <n-form
        ref="addTorrentForm"
        class="site-form"
        inline-message
        label-position="top"
        size="small"
        :rules="addTorrentRules"
        :model="newTorrent"
        :show-label="false"
        status-icon
      >
        <n-form-item required path="urls">
          <n-input
            v-model:value="newTorrent.urls"
            required
            type="textarea"
            placeholder="种子链接"
          />
        </n-form-item>
        <n-form-item label="属性" path="category">
          <n-space>
            <n-switch
              v-model:value="newTorrent.use_auto_torrent_management"
              :round="false" size="small"
              :rail-style="railStyle"
            >
              <template #checked>
                自动管理
              </template>
              <template #unchecked>
                手动管理
              </template>
            </n-switch>

            <n-switch
              v-model:value="newTorrent.is_paused"
              :round="false" size="small"
              :rail-style="railStyle"
            >
              <template #unchecked>
                开始
              </template>
              <template #checked>
                暂停
              </template>
            </n-switch>

            <n-switch
              v-model:value="newTorrent.is_skip_checking"
              :round="false" size="small"
              :rail-style="railStyle"
            >
              <template #checked>
                跳过校验
              </template>
              <template #unchecked>
                正常校验
              </template>
            </n-switch>
          </n-space>
        </n-form-item>
        <n-form-item label="分类" path="category">
          <n-select
            v-model:value="newTorrent.category"
            :multiple="false"
            :options="categories"
            filterable
            :tag="categoryFlag"
            placeholder="分类/路径"
            size="small"
          />
        </n-form-item>
        <n-form-item label="下载限速" path="download_limit">
          <n-input-number
            v-model:value="newTorrent.download_limit" size="small"
            placeholder="下载限速：KB/S"
            step="100" min="0"
            button-placement="both"
          >
            <template #prefix>
              ↓
            </template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="上传限速" path="upload_limit">
          <n-input-number
            v-model:value="newTorrent.upload_limit" size="small"
            placeholder="上传限速：KB/S"
            step="100"
            min="0"
            button-placement="both"
          >
            <template #prefix>
              ↑
            </template>
          </n-input-number>
        </n-form-item>
      </n-form>
    </n-space>
    <template #footer>
      <n-space justify="center">
        <n-button type="info" @click="cancelDownload">
          取消
        </n-button>
        <n-button type="primary" @click="handleDownload">
          下载
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
