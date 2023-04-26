import type { DataTableColumns, DropdownOption, FormInst, FormRules, SelectOption } from 'naive-ui'
import { NButton, NProgress, NSwitch, NTag, NTooltip } from 'naive-ui'
import type {
  Category,
  DownloadSpeedType, Downloader,
  Torrent,
} from '~/api/download'
import {
  $addDownloader,
  $controlTorrent,
  $editDownloader, $getCategoryList,
  $getDownloadSpeedList,
  $getDownloader, $getDownloaderList, $getTorrentList, $getTorrentProp, $removeDownloader,
} from '~/api/download'
import numberFormat from '~/hooks/numberFormat'
import timeFormat from '~/hooks/timeFormat'
import TimestampToBeijingTime from '~/hooks/timestampToBeijingTime'
import DownloaderForm from '~/pages/download/downloader/components/downloader-form.vue'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import renderSize from '~/hooks/renderSize'

export const useDownloadStore = defineStore('download', () => {
  const { dialog } = useGlobalConfig()
  const speedList = ref<DownloadSpeedType[]>([])
  const downloaderList = ref<Downloader[]>([])
  const timer = ref()
  const downloadingFlag = ref(false)
  const defaultDownloader = ref<number>(0)
  const checkedRowKeys = ref<string[]>([])
  const deleteModal = ref(false)
  const deleteFiles = ref(false)
  const torrentList = ref<Torrent[]>([])
  const downloadingTableRef = ref(null)
  const downloadLoading = ref(false)
  const download_state = {
    uploading: '正在上传',
    downloading: '正在下载',
    pausedUP: '完成上传',
    pausedDL: '暂停下载',
    checkingUP: '正在校验',
    forcedDL: '强制下载',
    stalledUP: '正在做种',
    stalledDL: '等待下载',
    missingFiles: '文件丢失',
    forcedUP: '强制做种',
    moving: '正在移动',
    queuedDL: '下载队列中',
    queuedUP: '上传队列中',
    error: '错误',
    unknown: '未知',
    allocating: '分配',
    metaDL: '下载元数据',
    checkingDL: '下载校验中',
    checkingResumeData: '校验恢复数据',
    forcedMetaDL: '强制下载元数据',
  }
  const trackerStatus = ref([
    '已禁用',
    '未联系',
    '工作中',
    '更新中',
    '出错啦',
  ])
  const setDownloadSpeedList = (value: DownloadSpeedType[]) => {
    speedList.value = value
  }

  const getTorrentProp = async (downloader_id: number, torrent_hash: string) => {
    return await $getTorrentProp({
      downloader_id,
      torrent_hash,
    })
  }
  const getDownloaderList = async () => {
    downloaderList.value = await $getDownloaderList()
  }
  const speedTotal = reactive<DownloadSpeedType>({
    name: '总速度',
    connection_status: false,
    dl_info_data: 0,
    dl_info_speed: 0,
    up_info_data: 0,
    up_info_speed: 0,
    category: 'none',
  })
  const downloader = {
    id: 0,
    name: '',
    usernames: '',
    password: '',
    host: '',
    port: 8999,
    category: 'Qb',
    enable: true,
    reserved_space: 30,
  }
  const downloaderForm = ref<Downloader>(downloader)
  const categorySelectList = ref<SelectOption[]>([
    {
      label: 'qBittorrent',
      value: 'Qb',
    },
    {
      label: 'Transmission',
      value: 'Tr',
    },
  ])
  const refDownloaderForm = ref<FormInst>()
  const addDownloaderFormRules = reactive<FormRules>({
    category: [
      {
        required: true,
        message: '请选择要添加的下载器',
        trigger: 'change',
      },
    ],
    name: [
      {
        required: true,
        message: '请为你的下载器命名',
        trigger: 'blur',
      },
    ],
    username: [
      {
        required: true,
        message: '请填写用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请填写密码',
        trigger: 'blur',
      },
    ],
    host: [
      {
        required: true,
        message: '请填写下载器地址',
        trigger: 'blur',
      },
    ],
    port: [
      {
        required: true,
        message: '请填写下载器端口',
        trigger: 'blur',
      },
    ],
    reserved_space: [
      {
        required: true,
        message: '请填写预留空间',
        trigger: 'blur',
      },
    ],
  })
  const getSpeedTotal = () => {
    speedTotal.dl_info_data = 0
    speedTotal.dl_info_speed = 0
    speedTotal.up_info_data = 0
    speedTotal.up_info_speed = 0
    speedList.value.forEach((speed: DownloadSpeedType) => {
      speedTotal.dl_info_data += speed.dl_info_data
      speedTotal.dl_info_speed += speed.dl_info_speed
      speedTotal.up_info_speed += speed.up_info_speed
      speedTotal.up_info_data += speed.up_info_data
    })
  }
  const editDownloader = async (downloader_id: number) => {
    if (downloader_id !== 0)
      downloaderForm.value = await $getDownloader({ downloader_id })

    dialog?.info({
      title: downloader_id === 0 ? '添加任务' : `编辑任务：${downloaderForm.value?.name}`,
      content: () => h(DownloaderForm),
      closable: true,
    })
  }
  const saveDownloader = async () => {
    await refDownloaderForm.value?.validate()
    const flag = downloaderForm.value?.id === 0
      ? await $addDownloader(downloaderForm.value)
      : await $editDownloader(downloaderForm.value!)
    if (flag) {
      dialog?.destroyAll()
      await getDownloaderList()
    }
  }
  const removeDownloader = async (downloader_id: number) => {
    const flag = await $removeDownloader({ downloader_id })
    if (flag) {
      dialog?.destroyAll()
      await getDownloaderList()
    }
  }
  const getSpeedList = async () => {
    speedList.value = await $getDownloadSpeedList()
    getSpeedTotal()
  }
  const clearSpeedListTimer = () => {
    clearInterval(timer.value)
    timer.value = null
  }
  /**
   * 获取下载器种子列表
   * @param downloader_id
   * @param prop
   * @param torrent_hashes
   */
  const getTorrentList = async (downloader_id: number, prop = false, torrent_hashes = '') => {
    return await $getTorrentList({
      downloader_id,
      prop,
      torrent_hashes,
    })
  }
  const interval = ref<number>(5)
  const timeout = ref<number>(10)
  const setIntervalValue = (value: number) => {
    interval.value = value
  }
  const setTimeoutValue = (value: number) => {
    timeout.value = value
  }
  const getSpeedListTimer = async () => {
    clearSpeedListTimer()
    timer.value = setInterval(async () => {
      speedList.value = await $getDownloadSpeedList()
      getSpeedTotal()
    }, interval.value * 1000)
    setTimeout(() => {
      clearSpeedListTimer()
    }, timeout.value * 1000 * 60)
  }
  const categoryList = ref<Category[]>()
  const categories = ref<{ label: string; value: string | number }[]>([{
    label: '请选择',
    value: '',
  }])
  const currentCategory = ref<string>('')
  const selectedCategories = ref<DropdownOption[]>([
    {
      label: '清除分类',
      key: 'clearCategory',
    },
    {
      label: '移除未使用',
      key: 'removeCategories',
    },
  ])
  const rightOptions = ref<DropdownOption[]>([
    {
      label: '详情',
      key: 'prop',
      icon: () => h(MenuIcon, { icon: 'Information' }),
    },
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
  ])

  const clearTimer = async () => {
    clearInterval(timer.value)
    timer.value = null
  }

  const startFresh = async () => {
    timer.value = setInterval(async () => {
      const showDataHashes = downloadingTableRef.value!.paginatedData.map((row: { key: string }) => row.key)
      const showData = await getTorrentList(defaultDownloader.value, true, showDataHashes.join('|'))
      showData.forEach((torrent: Torrent) => {
        const index = torrentList.value.findIndex(item => item.hash === torrent.hash)
        torrentList.value.splice(index, 1, torrent)
      })
    }, 5000)
    setTimeout(async () => {
      await clearTimer()
    }, timeout.value)
  }
  /**
     * 获取下载器分类列表
     * @param downloader_id
     */
  const getDownloaderCategoryList = async (downloader_id: number) => {
    categoryList.value = await $getCategoryList(downloader_id)
  }
  const handleUpdateDownloading = async (value: number) => {
    downloadLoading.value = true
    categories.value.length = 1
    selectedCategories.value.length = 2
    if (!isNaN(value))
      defaultDownloader.value = value
    await getDownloaderCategoryList(defaultDownloader.value)
    torrentList.value = await getTorrentList(defaultDownloader.value)

    categoryList.value?.forEach((category: Category) => {
      categories.value.push({
        label: category.name,
        value: category.name,
      })
      selectedCategories.value.push({
        label: category.name,
        key: `setCategory?${category.name}`,
      })
    })
    downloadLoading.value = false
    await startFresh()
  }
  const handleSelected = async (
    command: string,
    category = '',
    delete_files = false,
    enable = true,
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
      await getTorrentList(defaultDownloader.value)

    return flag
  }
  const handleDelete = async () => {
    deleteModal.value = false
    await handleSelected(
      'delete',
      '',
      deleteFiles.value,
    )
  }
  const downloadingColumns = shallowRef<DataTableColumns<Torrent>>([
    {
      type: 'selection',
      fixed: 'left',
    },
    // {
    //   type: 'expand',
    //   fixed: 'left',
    //   renderExpand: (rowData) => {
    //     return h(
    //       torrent,
    //       {
    //         torrent: rowData,
    //       },
    //     )
    //   },
    // },
    {
      title: '名称',
      key: 'name',
      fixed: 'left',
      minWidth: 120,
      width: 150,
      maxWidth: 300,
      resizable: true,
      sorter: 'default',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '分类',
      key: 'category',
      minWidth: 150,
      width: 150,
      maxWidth: 200,
      sorter: 'default',
      resizable: true,
      filter(value, row) {
        return !!~row.category.indexOf(value.toString())
      },
      filterOptions: categories.value,
      render: (row) => {
        if (row.category) {
          return h(
            NTag,
            {
              type: 'info',
              size: 'small',
              bordered: false,
            },
            {
              default: () => row.category,
            },
          )
        }
      },
    },
    {
      title: '大小',
      key: 'size',
      minWidth: 80,
      width: 80,
      maxWidth: 150,
      resizable: true,
      sorter: 'default',
      render(row: Torrent) {
        if (row.category) {
          return h(
            NTag,
            {
              type: 'info',
              size: 'small',
            },
            {
              default: () => renderSize(row.size),
            },
          )
        }
      },
    },
    // { title: '保存路径', key: 'save_path', width: 200 },
    {
      title: 'tracker',
      key: 'status',
      width: 80,
      sorter: (row1, row2) => {
        if (row1.trackers && row2.trackers)
          return row1.trackers[0].status - row2.trackers[0].status
        else
          return -1
      },
      filter(value, row) {
        const status = row.trackers && row.trackers[0] ? row.trackers[0].status : 3
        return status === value
      },
      filterOptions: trackerStatus.value.map((status, index) => ({
        label: status,
        value: index,
      })),
      render(row: Torrent) {
        const trackers = row.trackers
        const state = trackers ? trackers[0].status : 3
        if (state === 4) {
          return h(
            NTooltip,
            {
              trigger: 'hover',
            },
            {
              trigger: () => h(
                NTag,
                {
                  type: 'error',
                  size: 'small',
                },
                {
                  default: () => trackerStatus.value[trackers[0].status],
                },
              ),
              default: () => trackers[0].msg,
            },
          )
        }
        return h(
          NTag,
          {
            type: (() => {
              if (state === 2)
                return 'success'
              else
                return 'warning'
            })(),
            size: 'small',
          },
          {
            default: () => trackerStatus.value[state],
          },
        )
      },
    },
    {
      filter(value, row) {
        return !!~row.state.indexOf(value.toString())
      },
      filterOptions: Object.entries(download_state).map(([value, label]) => ({
        value,
        label,
      })),
      key: 'state',
      maxWidth: 150,
      minWidth: 80,
      render(row: Torrent) {
        return h(
          NTag,
          {
            type: (() => {
              const state = row.state
              if ([
                'error', 'missingFiles', 'unknown', 'metaDL', 'forcedMetaDL', '',
              ].includes(state))
                return 'error'
              else if ([
                'queuedUP', 'queuedDL', 'forcedDL', 'stalledUP', 'uploading', 'downloading', 'checkingUP',
              ].includes(state))
                return 'success'
              else
                return 'warning'
            })(),
            size: 'small',
          },
          {
            default: () => download_state[row.state],
          },
        )
      },
      resizable: true,
      sorter: 'default',
      title: '状态',
      width: 80,
    },
    {
      title: '进度',
      key: 'progress',
      minWidth: 80,
      width: 88,
      maxWidth: 120,
      resizable: true,
      sorter: (row1, row2) => row1.progress - row2.progress,
      render(row: Torrent) {
        return h(
          NProgress,
          {
            'type': 'line',
            'indicator-placement': 'inside',
            'percentage': Number((row.progress * 100).toFixed(2)),
            'height': 20,
            'borderRadius': 4,
            'fill-border-radius': 0,
          },
        )
      },
    },

    {
      title: '下载速度',
      key: 'dlspeed',
      minWidth: 80,
      maxWidth: 150,
      width: 100,
      resizable: true,
      sorter: (row1, row2) => row1.dlspeed - row2.dlspeed,
      render(row: Torrent) {
        return `${renderSize(row.dlspeed)}/s`
      },
    },
    {
      title: '已下载',
      key: 'completed',
      minWidth: 80,
      maxWidth: 150,
      width: 80,
      resizable: true,
      sorter: (row1, row2) => row1.completed - row2.completed,
      render(row: Torrent) {
        return renderSize(row.completed)
      },
    },
    {
      title: '上传速度',
      key: 'upspeed',
      minWidth: 80,
      maxWidth: 150,
      width: 100,
      resizable: true,
      sorter: (row1, row2) => row1.upspeed - row2.upspeed,
      render(row: Torrent) {
        return `${renderSize(row.upspeed)}/s`
      },
    },
    {
      title: '已上传',
      key: 'uploaded',
      minWidth: 80,
      maxWidth: 150,
      width: 80,
      resizable: true,
      sorter: (row1, row2) => row1.uploaded - row2.uploaded,
      render(row: Torrent) {
        return renderSize(row.uploaded)
      },
    },
    {
      title: '分享率',
      key: 'ratio',
      width: 75,
      minWidth: 75,
      maxWidth: 100,
      resizable: true,
      sorter: (row1, row2) => row1.ratio - row2.ratio,
      render(row: Torrent) {
        return numberFormat(row.ratio)
      },
    },
    {
      title: '总大小',
      key: 'total_size',
      sorter: (row1, row2) => row1.total_size - row2.total_size,
      minWidth: 80,
      maxWidth: 150,
      width: 80,
      resizable: true,
      render(row: Torrent) {
        return renderSize(row.uploaded)
      },
    },

    // { title: '下载链接', key: 'magnet_uri', minWidth: 100 },
    {
      title: '种子',
      key: 'num_complete',
      sorter: (row1, row2) => row1.num_complete - row2.num_complete,
      width: 85,
      minWidth: 85,
      maxWidth: 150,
      resizable: true,
      render(row: Torrent) {
        return `${row.num_complete}(${row.num_seeds})`
      },
    },
    {
      title: '未完成',
      key: 'num_incomplete',
      sorter: (row1, row2) => row1.num_incomplete - row2.num_incomplete,
      width: 65,
      minWidth: 65,
      maxWidth: 100,
      resizable: true,
    },
    {
      title: '下载中',
      key: 'num_leechs',
      sorter: (row1, row2) => row1.num_leechs - row2.num_leechs,
      width: 65,
      minWidth: 65,
      maxWidth: 100,
      resizable: true,
    },
    // {
    //   title: '做种中',
    //   key: 'num_seeds',
    //   sorter: (row1, row2) => row1.num_seeds - row2.num_seeds,
    //   minWidth: 100,
    // },

    // { title: '做种时间', key: 'seeding_time', minWidth: 100 },
    // { title: '最后完整可见', key: 'seen_complete', minWidth: 100 },
    // { title: '标签', key: 'tags', minWidth: 100 },
    // {
    //   title: '活动时间',
    //   key: 'time_active',
    //   width: 120,
    //   minWidth: 100,
    //   maxWidth: 180,
    //   resizable: true,
    //   render(row: Torrent) {
    //     return timeFormat(row.time_active)
    //   },
    // },
    // { title: '文件路径', key: 'content_path', minWidth: 100 },
    {
      title: '最后活动',
      key: 'last_activity',
      width: 100,
      minWidth: 100,
      maxWidth: 250,
      resizable: true,
      render(row: Torrent) {
        return timeFormat(new Date().getTime() / 1000 - row.last_activity)
      },
    },
    {
      title: '完成于',
      key: 'completion_on',
      width: 150,
      minWidth: 100,
      maxWidth: 300,
      resizable: true,
      sorter: 'default',
      render(row: Torrent) {
        return TimestampToBeijingTime(row.completion_on)
      },
    },
    {
      title: '添加时间',
      key: 'added_on',
      width: 150,
      minWidth: 100,
      maxWidth: 300,
      resizable: true,
      sorter: 'default',
      render(row: Torrent) {
        return TimestampToBeijingTime(row.added_on)
      },
    },
    // { title: 'Tracker', key: 'tracker', minWidth: 100 },

  ])

  const columns = ref<DataTableColumns<Downloader>>([
    {
      title: '名称',
      key: 'name',
      minWidth: 100,
    },
    {
      title: '地址',
      key: 'host',
      minWidth: 50,
      align: 'center',
      render(row: Downloader) {
        const url = `${row.host}:${row.port}`
        return h(
          NButton,
          {
            tag: 'a',
            href: url,
            target: '_blank',
            secondary: true,
            type: 'primary',
            size: 'small',
          },
          {
            default: () => '访问',
          },
        )
      },
    },
    {
      title: '类型',
      key: 'category',
      align: 'center',
      minWidth: 60,
    },
    {
      title: '开启',
      key: 'enable',
      minWidth: 80,
      align: 'center',
      render(row: Downloader) {
        return h(
          NSwitch,
          {
            'size': 'small',
            'round': false,
            'checked-value': true,
            'unchecked-value': false,
            'value': row.enable,
            'onUpdate:value': async (value) => {
              const downloader = await $getDownloader({ downloader_id: row.id })
              downloader.enable = value
              const flag = await $editDownloader(downloader)
              if (flag) await getDownloaderList()
            },
          },
          {
            'checked': () => '开启',
            'unchecked': () => '关闭',
            'checked-icon': () => '✅',
            'unchecked-icon': () => h(
              MenuIcon,
              {
                icon: 'CloseSharp',
                color: 'red',
                size: 16,
              },
            ),
          },
        )
      },
    },
    {
      key: 'actions',
      title: '操作',
      minWidth: 50,
      align: 'center',
      render(row: Downloader) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => editDownloader(row.id),
          },
          { default: () => '编辑' },
        )
      },
    },
  ])
  const handleCheckRows = (rowKeys: string[]) => {
    checkedRowKeys.value = rowKeys
  }
  const handleDeleteModal = (value: boolean) => {
    deleteModal.value = value
  }
  const handleDownloadLoading = (value: boolean) => {
    downloadLoading.value = value
  }
  const handleDefaultDownloader = (value: number) => {
    defaultDownloader.value = value
  }
  return {
    addDownloaderFormRules,
    categories,
    categorySelectList,
    checkedRowKeys,
    clearSpeedListTimer,
    clearTimer,
    columns,
    currentCategory,
    defaultDownloader,
    deleteFiles,
    deleteModal,
    downloadLoading,
    downloaderForm,
    downloaderList,
    torrentList,
    downloadingColumns,
    downloadingFlag,
    downloadingTableRef,
    editDownloader,
    getDownloaderList,
    getDownloading: getTorrentList,
    getSpeedList,
    getSpeedListTimer,
    getSpeedTotal,
    getTorrentProp,
    handleCheckRows,
    handleDefaultDownloader,
    handleDelete,
    handleDeleteModal,
    handleDownloadLoading,
    handleSelected,
    handleUpdateDownloading,
    interval,
    refDownloaderForm,
    removeDownloader,
    rightOptions,
    saveDownloader,
    setDownloadSpeedList,
    setIntervalValue,
    setTimeoutValue,
    speedList,
    speedTotal,
    startFresh,
    timeout,
    timer,
    trackerStatus,
  }
})
