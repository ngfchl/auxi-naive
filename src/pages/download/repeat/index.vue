<script setup lang="ts">
import type { DataTableRowKey, DropdownOption, SelectOption } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { Category, Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import { $controlTorrent } from '~/api/download'

const { message, dialog } = useGlobalConfig()
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
const defaultDownloader = ref<number>(0)
const timeout = ref<number>(1000 * 60)
const selectedCategories = ref<DropdownOption[]>([
  {
    label: '清除分类',
    key: 'clearCategory',
  },
  {
    label: '移除未使用',
    key: 'clearNotUsed',
  },
])
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
    children: selectedCategories.value,
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
const deleteFiles = ref(false)
const currentRow = ref<Torrent>()
const currentCategory = ref<string>('')
const checkedRowKeys = ref<DataTableRowKey[]>([])
const timer = ref({})
const categories = ref<SelectOption[]>([{
  label: '请选择',
  value: '',
}])
const x = ref(0)
const y = ref(0)
const deleteModal = ref(false)

const onClickOutside = () => {
  showDropdown.value = false
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
  }
}

const handleUpdateValue = async (value: number) => {
  categories.value.length = 1
  selectedCategories.value.length = 2
  currentCategory.value = ''
  loading.value = true
  await getDownloading(!isNaN(value) ? value : defaultDownloader.value)
  const options = downloading.value.categories.map((category: Category) => (
    {
      label: category.name,
      value: category.name,
    }))
  const selectedCategoriesOptions = downloading.value.categories.map((category: Category) => (
    {
      label: category.name,
      key: `setCategory?${category.name}`,
    }))
  categories.value.push(...options)
  selectedCategories.value.push(...selectedCategoriesOptions)
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
  if (row.super_seeding)
    cls = 'super-seeding'
  return cls
}

const handleCheckRows = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeys.value = rowKeys
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

const handleSelected = async (
  command: string, category = '', delete_files = false, enable = true,
) => {
  const data = {
    ids: checkedRowKeys.value,
    command,
    enable,
    category,
    delete_files,
    downloader_id: defaultDownloader.value,
  }
  deleteModal.value = false
  const flag = await $controlTorrent(data)
  if (flag)
    await getDownloading(defaultDownloader.value)
  return flag
}
const handleDelete = async () => {
  await handleExpandedRowKeys([])
  const flag = await handleSelected(
    'delete',
    '',
    deleteFiles.value,
  )
  if (flag)
    expandRowKeys.value = []
}
const setCategory = () => {
  handleSelected('set_category', this.category)
  this.categoryForm = false
  this.category = ''
}
const handleDeleteForm = () => {
  deleteModal.value = true
}
const handleSetCategory = () => {
  dialog?.info({
    title: '设置分类',
    content: () => h(
      handleForm,
      {
        command: 'set_category',
        downloader_id: defaultDownloader.value,
        torrent_hashes: checkedRowKeys.value,
      },
    ),
    closable: true,
  })
}
const handleSelect = (key: string, option: DropdownOption) => {
  if (checkedRowKeys.value.length <= 0)
    checkedRowKeys.value.push(currentRow.value?.hash)
  switch (key) {
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
      handleSelected(key)
      break
    case 'set_super_seeding':
      handleSelected(
        key, '',
        false,
        !currentRow.value?.super_seeding || false,
      )
      break
    case 'deleteForm':
      handleDeleteForm()
      break
    case 'categoryForm':
      handleSetCategory()
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
    case 'setAllCheckboxRow':
      message?.warning('正在开发哦！')
      break
    case 'filterSelect':
      message?.warning('正在开发哦！')
      break
    default:
      if (key.startsWith('setCategory')) {
        message?.warning(key.replace('setCategory?', ''))
        break
      }
      message?.warning('正在开发哦！')
  }
  showDropdown.value = false
}
const clearTimer = async () => {
  clearInterval(timer.value)
  timer.value = {}
}
onBeforeMount(async () => {
  loading.value = true
  await getDownloaderList()
  if (downloaderList.value.length > 0) {
    defaultDownloader.value = downloaderList.value[0].id
    await handleUpdateValue(defaultDownloader.value)
    timer.value = setInterval(async () => {
      await getDownloading(defaultDownloader.value)
      if (expandRowKeys.value.length > 0)
        await getTorrentProp(defaultDownloader.value, expandRowKeys.value[0])
    }, 3000)
    setTimeout(async () => {
      await clearTimer()
    }, timeout.value)
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
        <n-button v-if="timer !== {}" size="tiny" type="error" @click="clearTimer">
          停止
        </n-button>
        <n-button v-else size="tiny" type="success" @click="handleUpdateValue(defaultDownloader)">
          刷新
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
        ref="downloadingRef"
        :columns="downloadingColumns"
        :data="downloading.torrents"
        :expanded-row-keys="expandRowKeys"
        :loading="loading"
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
        @update:expanded-row-keys="handleExpandedRowKeys"
      />
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
