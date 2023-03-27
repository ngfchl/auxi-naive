import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NSpace, NSwitch, NTag } from 'naive-ui'
import type { MySite, NewestStatus, WebSite } from '~/api/website'
import {
  $getHistoryList,
  $getMySite,
  $getSignList,
  $mySiteList,
  $parseSiteHistory,
  $refreshSite,
  $signSite,
  $siteInfoNewList, $siteList,
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
  const columns = ref<DataTableColumns<WebSite>>([
    {
      title: 'id',
      key: 'id',
      minWidth: 35,
    },
    {
      title: '名称',
      key: 'name',
      minWidth: 65,
    },
    {
      title: '昵称',
      key: 'nickname',
      minWidth: 65,
    },
    {
      title: '标签',
      key: 'tags',
      minWidth: 85,
      render(row: WebSite) {
        const tagList = row.tags.split(',')
        return tagList.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
              bordered: false,
            },
            {
              default: () => tagKey,
            },
          )
        })
      },
    },
    {
      title: '支持功能',
      key: 'ability',
      render(row: WebSite) {
        const abilityList = [
          {
            name: '签到',
            key: 'func_sign_in',
            support: row.func_sign_in,
          },
          {
            name: '数据',
            key: 'func_get_userinfo',
            support: row.func_get_userinfo,
          },

          {
            name: '抓种',
            key: 'func_get_torrents',
            support: row.func_get_torrents,
          },
          // {
          //   name: '刷流',
          //   key: 'func_brush_flow',
          //   support: row.func_brush_flow,
          // },
          // {
          //   name: '辅种',
          //   key: 'func_repeat_torrents',
          //   support: row.func_repeat_torrents,
          // },
          // {
          //   name: '搜索',
          //   key: 'func_search',
          //   support: row.func_search,
          // },
          // {
          //   name: 'H&R',
          //   key: 'func_hr',
          //   support: row.func_hr,
          // },
        ]
        return h(NSpace, () => {
          return abilityList.map((ability) => {
            if (!ability.support) return null
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
      render(row: WebSite) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => message?.warning(`站点ID：${row.id}`),
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

  const siteList = ref<WebSite[]>([])
  const mySiteList = ref<MySite[]>([])
  const showList = ref<NewestStatus[]>([])
  const siteStatusList = ref<NewestStatus[]>([])
  const mySiteForm = ref<MySite>(mySite)
  const siteInfoList = ref([])
  const signInList = ref([])
  const siteHistory = ref([])

  const getMySiteList = async () => {
    mySiteList.value = await $mySiteList()
  }
  const getSiteList = async () => {
    siteList.value = await $siteList()
  }
  /**
     * 搜索
     */
  const siteSearch = async () => {
    searchKey.value === ''
      ? showList.value = siteStatusList.value
      : showList.value = siteStatusList.value.filter((item) => {
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
    siteStatusList.value = await $siteStatusNewestList()
    await siteSearch()
  }

  /**
     * 打开编辑窗口
     * @param id
     */
  const editMysite = async (id: number) => {
    siteInfoList.value = await $siteInfoNewList()
    mySiteForm.value = id === 0 ? mySite : await $getMySite({ mysite_id: id })
    title.value = id === 0 ? '添加站点' : `编辑站点：${mySiteForm.nickname}`
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
    signInList.value = await $getSignList({ site_id, page: 1, limit: 5 })
    const item = siteStatusList.value.find((item) => {
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
    siteHistory.value = {}
    siteHistory.value = await $parseSiteHistory(res)
    chart.value = true
    eDrawer.value = true
  }

  /**
     *
     */
  const initSomeData = () => {
    siteHistory.value = {}
    signInList.value = null
  }
  /**
     * 关闭编辑窗口并刷新数据
     */
  const closeEditForm = async () => {
    await initData()
    showAddMySite.value = false
  }
  return {
    eDrawer,
    addMySiteFormRules,
    mySite,
    columns,
    showAddMySite,
    siteList,
    mySiteList,
    showList,
    siteStatusList,
    mySiteForm,
    siteInfoList,
    searchKey,
    signInList,
    siteHistory,
    getMySiteList,
    getSiteList,
    siteSearch,
    initSomeData,
    siteEChart,
    initData,
    editMysite,
    signSite,
    getSignList,
    refreshSite,
    closeEditForm,
  }
})
