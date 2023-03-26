import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NSpace, NSwitch } from 'naive-ui'
import type { MySite } from '~/api/website'
import {
  $getHistoryList,
  $getMySite,
  $getSignList,
  $mySiteList,
  $parseSiteHistory,
  $refreshSite,
  $signSite,
  $siteInfoNewList,
  $siteStatusNewestList,
} from '~/api/website'
import { useGlobalConfig } from '~/composables/gobal-config'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

export const useWebsiteStore = defineStore('website', () => {
  const { message } = useGlobalConfig()
  /**
   * 搜索字符串
   */
  const searchKey = ref('')
  const eDrawer = ref(false)
  const sign = ref(false)
  const chart = ref(false)
  const drawerTitle = ref('详情')
  const columns = ref<DataTableColumns<MySite>>([
    {
      title: 'id',
      key: 'id',
      minWidth: 35,
    },
    {
      title: '名称',
      key: 'nickname',
      minWidth: 65,
    },
    {
      title: '开启功能',
      key: 'ability',
      render(row: MySite) {
        const abilityList = [
          {
            name: '签到',
            key: 'sign_in',
            support: row.sign_in,
          },
          {
            name: '数据',
            key: 'get_info',
            support: row.get_info,
          },

          {
            name: '抓种',
            key: 'get_torrents',
            support: row.get_torrents,
          },
          // {
          //   name: '刷流',
          //   key: 'brush_flow',
          //   support: row.brush_flow,
          // },
          // {
          //   name: '辅种',
          //   key: 'repeat_torrents',
          //   support: row.repeat_torrents,
          // },
          // {
          //   name: '搜索',
          //   key: 'search',
          //   support: row.search,
          // },
          // {
          //   name: 'H&R',
          //   key: 'hr',
          //   support: row.hr,
          // },
        ]
        return h(NSpace, () => {
          return abilityList.map((ability) => {
            return h(
              NSwitch,
              {
                size: 'small',
                round: false,
                value: ability.support,
              },
              {
                'checked': () => ability.name,
                'unchecked': () => ability.name,
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
          })
        })
      },
    },
    // {
    //   title: '注册时间',
    //   key: 'joined',
    // },
    // {
    //   title: '更新',
    //   key: 'updated',
    // },
    {
      key: 'actions',
      title: '操作',
      render(row: MySite) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => message?.warning(`下载器ID：${row.id}`),
          },
          { default: () => '操作' },
        )
      },
      align: 'center',
    },
  ])
  const mySite = reactive<MySite>({
    id: 0,
    site: 0,
    nickname: '',
    passkey: '',
    get_info: true,
    sign_in: true,
    get_torrents: false,
    brush_flow: false,
    repeat_torrents: false,
    hr: false,
    search: true,
    user_id: '',
    joined: '2023-01-01 12:00:00',
    user_agent: window.navigator.userAgent,
    cookie: '',
  })

  const addMySiteFormRules = reactive<FormRules>({
    site: [
      { required: true, message: '请选择要添加的站点', trigger: 'change' },
    ],
    user_id: [
      { required: true, message: '请输入数字UID，指定站点请输入用户名', trigger: 'blur' },
    ],
    cookie: [
      { required: true, message: '请输入站点Cookies，与UA搭配使用效果更佳', trigger: 'blur' },
    ],
    user_agent: [
      { required: true, message: '请输入浏览器UA，使用效果更佳', trigger: 'blur' },
    ],
  })

  /**
   * 是否打开编辑页
   */
  const showAddMySite = ref(false)

  /**
   * 编辑页名称
   */
  const title = ref('添加站点')

  const siteList = ref<MySite[]>([mySite])
  const data = reactive({
    showList: [],
    siteStatusList: [],
    mySiteForm: mySite,
    siteInfoList: [],
    signInList: null,
    siteHistory: {},
  })
  const getMySiteList = async () => {
    siteList.value = await $mySiteList()
  }
  /**
   * 搜索
   */
  const siteSearch = async () => {
    searchKey.value === ''
      ? data.showList = data.siteStatusList
      : data.showList = data.siteStatusList.filter((item) => {
        const { site, my_site } = item
        return site.url.toLowerCase().includes(searchKey.value.toLowerCase())
              || site.name.toLowerCase().includes(searchKey.value.toLowerCase())
              || site.nickname.toLowerCase().includes(searchKey.value.toLowerCase())
              || my_site.nickname.toLowerCase().includes(searchKey.value.toLowerCase())
              || my_site.user_id.toLowerCase().includes(searchKey.value.toLowerCase())
      })
  }
  /**
   * 初始化数据列表
   */
  const initData = async () => {
    data.siteStatusList = await $siteStatusNewestList()
    await siteSearch()
  }

  /**
   * 打开编辑窗口
   * @param id
   */
  const editMysite = async (id: number) => {
    data.siteInfoList = await $siteInfoNewList()
    data.mySiteForm = id === 0 ? mySite : await $getMySite({ mysite_id: id })
    title.value = id === 0 ? '添加站点' : `编辑站点：${data.mySiteForm.nickname}`
    showAddMySite.value = true
  }
  /**
   * 签到
   */
  const signSite = async (site_id: number) => {
    const flag = await $signSite(site_id)
    if (flag)
      await initData()
  }

  /**
   * 获取签到列表
   */
  const getSignList = async (site_id: number) => {
    data.signInList = await $getSignList({ site_id, page: 1, limit: 5 })
    const item = data.siteStatusList.find((item) => {
      return item.my_site.id === site_id
    })
    drawerTitle.value = `${item.my_site.nickname}  签到信息`
    sign.value = true
    eDrawer.value = true
  }
  /**
   * 更新站点数据
   */
  const refreshSite = async (site_id: number) => {
    const flag = await $refreshSite(site_id)
    if (flag)
      await initData()
  }

  /**
   * 更新站点数据
   */
  const siteEChart = async (site_id: number) => {
    const res = await $getHistoryList({ site_id })
    data.siteHistory = {}
    data.siteHistory = await $parseSiteHistory(res)
    chart.value = true
    eDrawer.value = true
  }

  /**
   *
   */
  const initSomeData = () => {
    data.siteHistory = {}
    data.signInList = null
  }
  /**
   * 关闭编辑窗口并刷新数据
   */
  const closeEditForm = async () => {
    await initData()
    showAddMySite.value = false
  }
  return {
    addMySiteFormRules,
    mySite,
    columns,
    showAddMySite,
    siteList,
    initSomeData,
    getMySiteList,
    siteEChart,
    siteSearch,
    initData,
    editMysite,
    signSite,
    getSignList,
    refreshSite,
    closeEditForm,
  }
})
