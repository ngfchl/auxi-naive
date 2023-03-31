import type { DataTableColumns, FormInst, FormRules, SelectOption } from 'naive-ui'
import { NButton, NSwitch } from 'naive-ui'
import type {
  DownloadSpeedType,
  Downloader,
} from '~/api/download'
import {
  $addDownloader,
  $editDownloader,
  $getDownloadSpeedList,
  $getDownloader,
  $getDownloaderList, $removeDownloader,
} from '~/api/download'
import DownloaderForm from '~/pages/download/downloader/components/downloader-form.vue'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

export const useDownloadStore = defineStore('download', () => {
  const { dialog } = useGlobalConfig()
  const speedList = ref<DownloadSpeedType[]>([])
  const downloaderList = ref<Downloader[]>([])
  const timer = ref()
  const downloadingFlag = ref(false)

  const setDownloadSpeedList = (value: DownloadSpeedType[]) => {
    speedList.value = value
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
  const getSpeedListTimer = async () => {
    timer.value = setInterval(async () => {
      speedList.value = await $getDownloadSpeedList()
      getSpeedTotal()
    }, 5000)
    setTimeout(() => {
      clearSpeedListTimer()
    }, 1000 * 60 * 15)
  }
  const columns = ref<DataTableColumns<Downloader>>([
    {
      title: '名称',
      key: 'name',
      width: 150,
    },
    {
      title: '地址',
      key: 'host',
      width: 150,
    },
    {
      title: '类型',
      key: 'category',
      width: 150,
    },
    {
      title: '开启',
      key: 'enable',
      width: 150,
      render(row: Downloader) {
        return h(
          NSwitch,
          {
            size: 'small',
            round: false,
            value: row.enable,
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
      width: 150,
      align: 'center',
    },
  ])
  return {
    timer,
    columns,
    speedList,
    speedTotal,
    downloaderList,
    downloaderForm,
    downloadingFlag,
    refDownloaderForm,
    categorySelectList,
    addDownloaderFormRules,
    getSpeedListTimer,
    setDownloadSpeedList,
    clearSpeedListTimer,
    getSpeedTotal,
    getSpeedList,
    getDownloaderList,
    editDownloader,
    saveDownloader,
    removeDownloader,
  }
})
