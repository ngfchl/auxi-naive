import type { ECBasicOption } from 'echarts/types/src/util/types'
import type { DataTableColumns, FormInst, FormItemRule, FormRules, SelectOption } from 'naive-ui'
import { NButton, NSpace, NSwitch, NTag } from 'naive-ui'
import MySiteForm from '@/pages/website/components/MySiteForm.vue'
import type { BarData, MySite, NewestStatus, PerDayData, PieData, SiteStatus, TodayData, WebSite } from '~/api/website'
import {
  $editMySite,
  $getHistoryList,
  $getMySite,
  $getNewestStatus,
  $getSignList,
  $mySiteList,
  $parseSiteHistory,
  $refreshAllSite,
  $refreshSite,
  $removeMySite,
  $saveMySite,
  $signAllSite,
  $signSite,
  $siteInfoNewList,
  $siteList,
  $siteStatusNewestList,
  $sortSite,
  $todayDataList,
} from '~/api/website'
import { useGlobalConfig } from '~/composables/gobal-config'
import renderSize from '~/hooks/renderSize'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
import { railStyle } from '~/utils/baseStyle'

export const useWebsiteStore = defineStore('website',
  () => {
    const { dialog } = useGlobalConfig()
    /**
         * 搜索字符串
         */
    const searchKey = ref('')
    const eDrawer = ref(false)
    const spinShow = ref(false)
    const sign_today = ref(false)
    const drawerTitle = ref('详情')
    const page = ref(1)
    const pageSize = ref(8)
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
        render(row: WebSite) {
          return h(
            NButton,
            {
              tag: 'a',
              href: row.url,
              target: '_blank',
              secondary: true,
              type: 'primary',
              size: 'small',
            },
            {
              default: () => `${row.name} - ${row.nickname}`,
            },
          )
        },
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
              key: 'sign_in',
              support: row.sign_in,
            },
            {
              name: '数据',
              key: 'get_info',
              support: row.get_info,
            },

            {
              name: 'Free刷流',
              key: 'brush_free',
              support: row.brush_free,
            },
            {
              name: 'RSS刷流',
              key: 'brush_rss',
              support: row.brush_rss,
            },
            {
              name: '辅种',
              key: 'repeat_torrents',
              support: row.repeat_torrents,
            },
            {
              name: '搜索',
              key: 'search_torrents',
              support: row.search_torrents,
            },
            {
              name: 'H&R',
              key: 'hr_discern',
              support: row.hr_discern,
            },
          ]
          return h(NSpace, () => {
            return abilityList.map((ability) => {
              if (!ability.support) return null
              return h(
                NSwitch,
                {
                  'size': 'small',
                  'round': false,
                  'value': ability.support,
                  // 'disabled': true,
                  'onUpdate:value': async () => {
                  },
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
      // {
      //   key: 'actions',
      //   title: '操作',
      //   render(row: WebSite) {
      //     return h(
      //       NButton,
      //       {
      //         size: 'small',
      //         onClick: () => message?.warning(`站点ID：${row.id}`),
      //       },
      //       { default: () => '操作' },
      //     )
      //   },
      //   align: 'center',
      // },
    ])
    const mySite: MySite = {
      id: 0,
      sort_id: 1,
      site: undefined,
      nickname: '',
      passkey: '',
      get_info: true,
      sign_in: true,
      brush_rss: false,
      brush_free: false,
      package_file: false,
      repeat_torrents: false,
      hr_discern: false,
      search_torrents: false,
      user_id: '',
      joined: '2023-01-01 12:00:00',
      user_agent: window.navigator.userAgent,
      cookie: '',
      rss: '',
      torrents: '',
      downloader_id: undefined,
      custom_server: '',
      remove_torrent_rules: '{\n'
          + '  "push": {\n'
          + '    "size": {\n'
          + '      "min": 1,\n'
          + '      "max": 30\n'
          + '    },\n'
          + '    "published": 1800,\n'
          + '    "seeders": 3,\n'
          + '    "sale_expire": 3600,\n'
          + '  },\n'
          + '  "remove": {\n'
          + '    "upload_speed_avg": {\n'
          + '      "time": 300,\n'
          + '      "upload_speed": 100\n'
          + '    },\n'
          + '    "progress_check": {\n'
          + '      "0.05": 100,\n'
          + '      "0.5": 100,\n'
          + '      "0.8": 100,\n'
          + '      "0.9": 100\n'
          + '    },\n'
          + '    "ratio": {\n'
          + '      "600": 0.1,\n'
          + '      "1800": 0.5\n'
          + '    },\n'
          + '    "timeout": 3600,\n'
          + '    "completers": 5,\n'
          + '    "max_ratio": 3,\n'
          + '    "num_delete": 5\n'
          + '  }\n'
          + '}',
    }
    const addMySiteFormRules = ref<FormRules>({
      site: [
        {
          required: true,
          message: '请选择要添加的站点',
          trigger: 'blur',
          validator: (rule: FormItemRule, value: number) => {
            return value > 0
          },
        },
      ],
      nickname: [
        {
          required: true,
          message: '自定义站点名称，必填',
          trigger: ['blur', 'input'],
          min: 1,
        },
      ],
      user_id: [
        {
          required: true,
          message: '请输入数字UID，指定站点请输入用户名',
          trigger: ['blur', 'input'],
          min: 1,
        },
      ],
      cookie: [
        {
          required: true,
          message: '请输入站点Cookies，与UA搭配使用效果更佳',
          trigger: ['blur', 'input'],
          min: 32,
        },
      ],
      user_agent: [
        {
          required: true,
          message: '请输入浏览器UA，使用效果更佳',
          trigger: ['blur', 'input'],
        },
      ],
    })

    /**
         * 是否打开编辑页
         */
    const showAddMySite = ref(false)
    const refMySiteForm = ref<FormInst>()
    const siteList = ref<WebSite[]>([])
    const mySiteList = ref<MySite[]>([])
    const showList = ref<NewestStatus[]>([])
    const siteStatusList = ref<NewestStatus[]>([])
    const mySiteForm = ref<MySite>({ ...mySite })
    const siteInfoList = ref<SelectOption[]>([{
      label: '请选择站点',
      value: 0,
    }])
    const signInList = ref([])
    const siteHistory = ref()
    const baseTotalData: SiteStatus = {
      bonus_hour: 0,
      seed_days: 0,
      site: 0,
      id: 0,
      my_bonus: 0,
      my_score: 0,
      uploaded: 0,
      downloaded: 0,
      ratio: 1,
      seed_volume: 0,
      leech: 0,
      seed: 0,
      publish: 0,
      invitation: 0,
      my_level: '',
      my_hr: '',
      mail: 0,
    }
    const totalData = ref<SiteStatus>(baseTotalData)
    const siteInfoFlag = ref(false)
    const perDayData = ref<PerDayData>()
    const currentSite = ref<number>(0)
    const diffUploadedList = ref<BarData[]>([])
    const diffDownloadedList = ref<BarData[]>([])
    const todayDataList = ref<TodayData>()
    const todayUploadedDataList = ref<PieData[]>([])
    const todayDownloadedDataList = ref<PieData[]>([])
    const barOption = ref<ECBasicOption>()
    const pieOption = ref<ECBasicOption>()
    const pieTotalOption = ref<ECBasicOption>()
    const totalUploadedDataList = ref<PieData[]>([])
    const totalDownloadedDataList = ref<PieData[]>([])
    const dataLength = ref<number>(-7)
    const days = ref<{
      label: string
      value: number
    }[]>([
      {
        label: '7天',
        value: -7,
      },
      {
        label: '半月',
        value: -15,
      },
      {
        label: '30天',
        value: -30,
      },
      // {
      //   label: '俩月',
      //   value: -61,
      // },
      // {
      //   label: '仨月',
      //   value: -91,
      // },
      {
        label: '半年',
        value: -184,
      },
      {
        label: '一年',
        value: -366,
      },
      {
        label: '全部',
        value: 0,
      },
    ])
    const getTodayDataList = async () => {
      todayUploadedDataList.value.length = 0
      todayDownloadedDataList.value.length = 0
      pieOption.value = {}
      let downloadTotal = 0
      todayDataList.value = await $todayDataList()
      todayDataList.value?.data.forEach((todayIncreaseData) => {
        if (todayIncreaseData.uploaded > 0) {
          todayUploadedDataList.value.push({
            name: todayIncreaseData.name,
            value: todayIncreaseData.uploaded,
          })
        }
        if (todayIncreaseData.downloaded > 0) {
          todayDownloadedDataList.value.push({
            name: todayIncreaseData.name,
            value: todayIncreaseData.downloaded,
          })
          downloadTotal += todayIncreaseData.downloaded
        }
      })
      if (downloadTotal <= 0) {
        todayDownloadedDataList.value.push({
          name: '今日无下载',
          value: 0,
        })
      }
      todayUploadedDataList.value.sort((a, b) => a.value - b.value)
      todayDownloadedDataList.value.sort((a, b) => a.value - b.value)
      pieOption.value = {
        title: {
          text: `⬆${renderSize(todayDataList.value!.total_upload)} ⬇${renderSize(todayDataList.value!.total_download)}`,
          top: 15,
          left: 'center',
          textStyle: {
            fontSize: 18,
            color: 'orangered',
          },
        },
        bottom: 0,
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
          },
        },
        tooltip: {
          show: false,
          formatter(params: { name: string; data: { value: number } }) {
            return `${params.name}：\t${renderSize(params.data.value)}`
          },
          valueFormatter(value: number) {
            return renderSize(value)
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '下载量',
            type: 'pie',
            radius: ['25%', '45%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: false,
              position: 'center',
              formatter(params: { data: { value: number }; name: string }) {
                if (params.data.value > 0)
                  return `${params.name} ⬇${renderSize(params.data.value)}`
              },
              itemHeight: 16,
              itemWidth: 20,
              fontSize: 14,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: todayDownloadedDataList,
          },
          {
            name: '上传量',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              position: 'center',
              formatter(params: { data: { value: number }; name: any }) {
                if (params.data.value > 0)
                  return `${params.name} ⬆${renderSize(params.data.value)}`
              },
              itemHeight: 16,
              itemWidth: 20,
              fontSize: 14,
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: todayUploadedDataList.value,
          },

        ],
      }
    }
    const getPerDayData = async (days?: number) => {
      perDayData.value = await $getHistoryList({ days })
      diffUploadedList.value.length = 0
      diffDownloadedList.value.length = 0
      perDayData.value?.diff.forEach((item) => {
        diffUploadedList.value.push({
          name: item.name,
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          stack: 'uploaded',
          data: item.diff_uploaded_list,
        })
        diffDownloadedList.value.push({
          name: item.name,
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          stack: 'downloaded',
          data: item.diff_downloaded_list,
        })
      })

      barOption.value = {
        title: {
          text: '每日上传',
          textStyle: {
            color: 'orangered',
          },
          left: 'center',
          top: '12',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(params: { axisValue: string; value: number; color?: any; seriesName?: any }[]) {
            // console.log(params[0].value[1])
            let text = ''
            let total = 0
            params.sort((a: { value: number }, b: { value: number }) => {
              return b.value - a.value
            })
            params.forEach((param) => {
              const temp = param.value === 0
                ? ''
                : `<div style="display: block;height:14px;width: 48%;float:left;padding: 1%;font-size: 10px;">
                <span style="float:left;"><i style="width: 8px;height: 8px;display: inline-block;background: ${param.color};border-radius: 8px;"></i>${param.seriesName}: </span>
                <span style="float:right;">${renderSize(param.value)}</span>
              </div>`
              text += temp
              total += param.value
            })
            let total_str = `<div style="display: block;height:14px;text-align: left;padding: 1%;font-size: 12px;">
                              <span style="float: left;">
                                    <i style="width: 8px;height: 8px;display: inline-block;background: darkorange;border-radius: 8px;">
                                    </i>总计：${renderSize(total)}</span>
                              <text style="float: right;">${params[0].axisValue}</text>
                            </div>
                            <hr>`
            total_str += text
            return `<div style="width: 280px;">${total_str}</div>`
          },
          position(point: number[]) {
            const customVH = window.innerWidth
            if (customVH - point[0] < 768)
              point[0] = 12

            return [12, 8]
          },
          order: 'valueDesc',
          confine: false,
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);', // 附加阴影样式
        },
        legend: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            dataZoom: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            onZero: false,
          },
          data: perDayData.value?.date_list,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter(value: number) {
              return renderSize(value)
            },
          },
        },
        series: diffUploadedList.value,
      }
    }

    const getSiteList = async () => {
      siteList.value = await $siteList()
    }

    /**
         * 搜索
         */
    const siteSearch = async () => {
      siteStatusList.value.sort((a, b) => {
        if (b.status.mail === a.status.mail) {
          if (b.my_site.sort_id === a.my_site.sort_id)
            return b.my_site.id - a.my_site.id

          return b.my_site.sort_id - a.my_site.sort_id
        }
        return b.status.mail - a.status.mail
      })
      searchKey.value === ''
        ? showList.value = siteStatusList.value
        : showList.value = siteStatusList.value.filter((item) => {
          const {
            site,
            my_site,
          } = item
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
      spinShow.value = true
      siteStatusList.value.length = 0
      siteStatusList.value = await $siteStatusNewestList()
      await siteSearch()
      spinShow.value = false
    }

    const getTotalData = async () => {
      siteStatusList.value.length = 0
      totalDownloadedDataList.value.length = 0
      totalUploadedDataList.value.length = 0
      siteStatusList.value = await $siteStatusNewestList()
      totalData.value = {
        bonus_hour: 0,
        seed_days: 0,
        site: 0,
        id: 0,
        my_bonus: 0,
        my_score: 0,
        uploaded: 0,
        downloaded: 0,
        ratio: 1,
        seed_volume: 0,
        leech: 0,
        seed: 0,
        publish: 0,
        invitation: 0,
        my_level: '',
        my_hr: '',
        mail: 0,
      }
      siteStatusList.value.forEach((siteStatus) => {
        const s = siteStatus.status
        totalData.value.bonus_hour += s.bonus_hour
        totalData.value.seed_days += s.seed_days
        totalData.value.my_bonus += s.my_bonus
        totalData.value.my_score += s.my_score
        totalData.value.uploaded += s.uploaded
        totalData.value.downloaded += s.downloaded
        totalData.value.seed_volume += s.seed_volume
        totalData.value.leech += s.leech
        totalData.value.seed += s.seed
        totalData.value.publish += s.publish
        totalData.value.invitation += s.invitation
        totalData.value.mail += s.mail
        const mysite: MySite = siteStatus.my_site
        totalUploadedDataList.value.push({
          name: mysite.nickname,
          value: s.uploaded,
        })
        totalDownloadedDataList.value.push({
          name: mysite.nickname,
          value: s.downloaded,
        })
      })
      totalData.value.ratio = totalData.value.downloaded > 0 ? totalData.value.uploaded / totalData.value.downloaded : 0
      pieTotalOption.value = {
        title: {
          text: `⬆${renderSize(totalData.value.uploaded)} ⬇${renderSize(totalData.value.downloaded)}`,
          top: 5,
          left: 'center',
          textStyle: {
            fontSize: 18,
            color: 'orangered',
          },
        },
        bottom: 0,
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
          },
        },
        tooltip: {
          show: false,
          formatter(params: { name: string; data: { value: number } }) {
            return `${params.name}：\t${renderSize(params.data.value)}`
          },
          valueFormatter(value: number) {
            return renderSize(value)
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '下载量',
            type: 'pie',
            radius: ['25%', '45%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: false,
              position: 'center',
              formatter(params: { data: { value: number }; name: string }) {
                if (params.data.value > 0)
                  return `${params.name} ⬇${renderSize(params.data.value)}`
              },
              itemHeight: 16,
              itemWidth: 20,
              fontSize: 14,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: totalDownloadedDataList.value,
          },
          {
            name: '上传量',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              position: 'center',
              formatter(params: { data: { value: number }; name: any }) {
                if (params.data.value > 0)
                  return `${params.name} ⬆${renderSize(params.data.value)}`
              },
              itemHeight: 16,
              itemWidth: 20,
              fontSize: 14,
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: totalUploadedDataList.value,
          },
        ],
      }
    }

    /**
         * 更新数据后替换站点数据
         * @param site_id
         */
    const updateMySiteStatus = async (site_id: number) => {
      const index = siteStatusList.value.findIndex((status: NewestStatus) => {
        return status.my_site.id === site_id
      })

      const item = await $getNewestStatus(site_id)
      siteStatusList.value.splice(index, 1, item)
      await siteSearch()
    }

    const sortMySite = async (my_site: MySite) => {
      const flag = await $sortSite(my_site.id, my_site.sort_id)
      if (flag) await updateMySiteStatus(my_site.id)
    }

    /**
         * 打开编辑窗口
         * @param id
         */
    const editMysite = async (id: number) => {
      const siteList = id === 0 ? await $siteInfoNewList() : await $siteList()
      siteInfoList.value.length = 0
      siteList.forEach((item: WebSite) => {
        siteInfoList.value.push({
          label: String(item.name),
          value: item.id,
        })
      })
      mySiteForm.value = id === 0 ? { ...mySite } : await $getMySite({ mysite_id: id })
      dialog?.info({
        title: id === 0 ? '添加站点' : `编辑站点：${mySiteForm.value.nickname}`,
        content: () => h(MySiteForm),
        closable: true,
      })
    }

    const saveMySite = async () => {
      await refMySiteForm.value?.validate()
      const flag = mySiteForm.value.id === 0 ? await $saveMySite(mySiteForm.value) : await $editMySite(mySiteForm.value)
      if (flag) {
        await updateMySiteStatus(mySiteForm.value.id)
        mySiteForm.value = { ...mySite }
        dialog?.destroyAll()
      }
    }

    /**
         * 签到
         */
    const signSite = async (site_id: number) => {
      const flag = await $signSite(site_id)
      if (flag)
        await updateMySiteStatus(site_id)
    }
    const signAllSite = async () => {
      await $signAllSite()
    }
    const getSite = (site_id: number) => {
      return siteStatusList.value.find((item) => {
        return item.my_site.id === site_id
      })
    }
    const deleteSite = (site_id: number) => {
      const index = siteStatusList.value.findIndex((item) => {
        return item.my_site.id === site_id
      })
      siteStatusList.value.splice(index, 1)
    }

    const removeMySite = async (site_id: number) => {
      const flag = await $removeMySite({ site_id })
      if (flag) {
        deleteSite(site_id)
        dialog?.destroyAll()
      }
    }
    /**
         * 获取签到列表
         */
    const getSignList = async (site_id: number) => {
      const sign_list_res = await $getSignList({
        site_id,
        page: 1,
        limit: 5,
      })
      signInList.value = sign_list_res.items
      const item = getSite(site_id)
      drawerTitle.value = `${item?.my_site.nickname}  签到信息`
      sign_today.value = true
      eDrawer.value = true
    }
    /**
         * 更新站点数据
         */
    const refreshSite = async (site_id: number) => {
      const data = await $refreshSite(site_id)
      if (data) await updateMySiteStatus(site_id)
    }
    const refreshAllSite = async () => {
      spinShow.value = true
      await $refreshAllSite()
      spinShow.value = false
    }

    /**
         * 更新站点数据
         */
    const siteEChart = async (site_id: number, days = -7) => {
      const res = await $getHistoryList({
        site_id,
        days,
      })
      const item = getSite(site_id)
      drawerTitle.value = `${item?.my_site.nickname}  历史数据`
      siteHistory.value = await $parseSiteHistory(res)
      currentSite.value = site_id
      sign_today.value = false
      eDrawer.value = true
    }

    /**
         *
         */
    const initSomeData = () => {
      siteHistory.value.length = 0
    }
    /**
         * 关闭编辑窗口并刷新数据
         */
    const closeEditForm = async () => {
      await initData()
      showAddMySite.value = false
    }

    const getMySiteList = async () => {
      mySiteList.value = await $mySiteList()
      mySiteList.value.sort((a, b) => b.sort_id - a.sort_id)
    }
    const mySiteColumns = ref<DataTableColumns<MySite>>([
      {
        title: 'id',
        key: 'id',
        minWidth: 55,
        width: 65,
        fixed: 'left',
        sorter: 'default',
      },
      {
        title: '排序',
        key: 'sort_id',
        minWidth: 65,
        width: 65,
        fixed: 'left',
        sorter: 'default',
      },
      {
        title: '名称',
        key: 'nickname',
        minWidth: 65,
        width: 125,
        fixed: 'left',
        sorter: 'default',
        render(row: MySite) {
          const website = siteList.value.find(item => item.id === row.site)
          return h(
            NButton,
            {
              tag: 'a',
              href: website?.url,
              target: '_blank',
              secondary: true,
              type: 'primary',
              size: 'small',
            },
            {
              default: () => `${row.nickname}`,
            },
          )
        },
      },
      // {
      //   title: '标签',
      //   key: 'tags',
      //   minWidth: 85,
      //   render(row: MySite) {
      //     const tagList = row.tags.split(',')
      //     return tagList.map((tagKey) => {
      //       return h(
      //         NTag,
      //         {
      //           style: {
      //             marginRight: '6px',
      //           },
      //           type: 'info',
      //           bordered: false,
      //         },
      //         {
      //           default: () => tagKey,
      //         },
      //       )
      //     })
      //   },
      // },
      {
        title: '支持功能',
        key: 'ability',
        minWidth: 255,
        width: 315,
        align: 'center',
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
              name: '辅种',
              key: 'repeat_torrents',
              support: row.repeat_torrents,
            },
            {
              name: '搜索',
              key: 'search_torrents',
              support: row.search_torrents,
            },
            {
              name: 'H&R',
              key: 'hr_discern',
              support: row.hr_discern,
            },
            {
              name: 'Free刷流',
              key: 'brush_free',
              support: row.brush_free,
            },
            {
              name: 'RSS刷流',
              key: 'brush_rss',
              support: row.brush_rss,
            },
            {
              name: '拆包刷流',
              key: 'package_file',
              support: row.package_file,
            },
          ]
          const website = siteList.value.find(item => item.id === row.site)
          return h(NSpace, () => {
            return abilityList.map((ability) => {
              if (!website[ability.key]) return null
              return h(
                NSwitch,
                {
                  'size': 'small',
                  'round': false,
                  'value': ability.support,
                  'rail-style': railStyle,
                  // 'disabled': true,
                  'onUpdate:value': async (value) => {
                    const mySite = await $getMySite({ mysite_id: row.id })
                    mySite[ability.key] = value
                    const flag = await $editMySite(mySite)
                    if (flag) await getMySiteList()
                  },
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
      {
        title: '拆包刷流',
        key: 'package_file',
        minWidth: 95,
        width: 95,
        render(row: MySite) {
          return h(
            NSwitch,
            {
              'size': 'small',
              'round': false,
              'value': row.package_file,
              'rail-style': railStyle,
              'onUpdate:value': async (value) => {
                const mySite = await $getMySite({ mysite_id: row.id })
                mySite.package_file = value
                const flag = await $editMySite(mySite)
                if (flag) await getMySiteList()
              },
            },
            {
              'checked': () => '拆包',
              'unchecked': () => '不拆包',
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
      // {
      //   title: '注册时间',
      //   key: 'time_join',
      //   minWidth: 215,
      // },
      // {
      //   title: '更新',
      //   key: 'updated_at',
      //   minWidth: 215,
      // },
      {
        key: 'actions',
        title: '操作',
        minWidth: 85,
        width: 85,
        render(row: MySite) {
          return h(
            NButton,
            {
              size: 'small',
              type: 'warning',
              onClick: async () => await editMysite(row.id),
            },
            { default: () => '编辑' },
          )
        },
        align: 'center',
      },
    ])

    return {
      addMySiteFormRules,
      barOption,
      closeEditForm,
      columns,
      currentSite,
      dataLength,
      days,
      drawerTitle,
      eDrawer,
      editMysite,
      getMySiteList,
      getPerDayData,
      getSignList,
      getSiteList,
      getTodayDataList,
      getTotalData,
      initData,
      initSomeData,
      mySite,
      mySiteColumns,
      mySiteForm,
      mySiteList,
      page,
      pageSize,
      perDayData,
      pieOption,
      pieTotalOption,
      refMySiteForm,
      refreshAllSite,
      refreshSite,
      removeMySite,
      saveMySite,
      searchKey,
      showAddMySite,
      showList,
      signAllSite,
      signInList,
      signSite,
      sign_today,
      siteEChart,
      siteHistory,
      siteInfoFlag,
      siteInfoList,
      siteList,
      siteSearch,
      siteStatusList,
      sortMySite,
      spinShow,
      todayDataList,
      todayDownloadedDataList,
      todayUploadedDataList,
      totalData,
      updateMySiteStatus,
    }
  })
