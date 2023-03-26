import { getList } from '~/hooks/getList'
import renderSize from '@/hooks/renderSize'
import numberFormat from '@/hooks/numberFormat'
import { useGlobalConfig } from '~/composables/gobal-config'

export interface MySite {
  id: number
  site: number
  nickname: string
  passkey: string
  get_info: boolean
  sign_in: boolean
  get_torrents: boolean
  brush_flow: boolean
  repeat_torrents: boolean
  hr: boolean
  search: boolean
  user_id: string
  joined: string
  user_agent: string
  cookie: string
}

export interface SiteHistoryList {
  uploaded_list: number[]
  downloaded_list: number[]
  diff_uploaded_list: number[]
  diff_downloaded_list: number[]
  bonus_list: number[]
  score_list: number[]
  ratio_list: number[]
  seeding_size_list: number[]
  seeding_list: number[]
  leeching_list: number[]
  invitation_list: number[]
  bonus_hour_list: number[]
  date_list: number[]
}

const { message } = useGlobalConfig()

/**
 * 获取我的站点列表
 */
export const $mySiteList: () => Promise<any> = async () => {
  return await getList('mysite/mysite')
}

/**
 * 获取全部种子列表
 */
export const $torrentList = async () => {
  return await getList('mysite/torrents')
}
/**
 * 获取未添加站点列表
 */
export const $siteInfoNewList = async () => {
  return await getList('website/website/new')
}

/**
 * 获取已添加站点最新状态列表
 */
export const $siteStatusNewestList = async () => {
  return await getList('mysite/status/newest')
}

/**
 * 获取已添加站点网站列表
 */
export const $siteList = async () => {
  return await getList('website/website')
}

/**
 * 获取单个站点信息
 * @param params
 */
export const $getMySite = async (params: object) => {
  return await getList('mysite/mysite/get', params)
}
/**
 * 删除单个站点信息
 * @param params
 */
export const $removeMySite = async (params: object) => {
  const { msg, code } = await useDelete('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 编辑我的站点
 * @param params
 */
export const $editMySite = async (params: MySite) => {
  const { msg, code } = await usePut('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
/**
 * 新增我的站点
 * @param params
 */
export const $saveMySite = async (params: MySite) => {
  const { msg, code } = await usePost('mysite/mysite', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 签到
 * @param site_id
 */
export const $signSite = async (site_id: number) => {
  const { msg, code } = await usePost('mysite/signin', { site_id })
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 刷新
 * @param site_id
 */
export const $refreshSite = async (site_id: number) => {
  const { msg, code } = await usePost('mysite/status', { site_id })
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

/**
 * 获取站点签到信息列表
 * @param params
 */
export const $getSignList = async (params: object) => {
  return await getList('mysite/signin', params)
}

/**
 * 获取站点历史数据
 * @param params
 */
export const $getHistoryList = async (params: object) => {
  return await getList('mysite/status/chart', params)
}

/**
 * 站点历史数据生成图表配置
 */

export const $parseSiteHistory = async (siteHistoryList: SiteHistoryList) => {
  const {
    uploaded_list,
    downloaded_list,
    diff_uploaded_list,
    diff_downloaded_list,
    bonus_list,
    score_list,
    ratio_list,
    seeding_size_list,
    seeding_list,
    leeching_list,
    invitation_list,
    bonus_hour_list,
    date_list,
  } = siteHistoryList
  const option = {
    // title: {
    //    text: site.name,
    //    textStyle: {
    //        color: 'orangered',
    //    },
    //    left: 'center',
    //    top: '3%',
    // },
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        align: 'left',
      },
      // formatter: function (params) {
      //    return params.name + '\t' + renderSize(params.data.value)
      // },
      valueFormatter(value: string | number | null) {
        return renderSize(Number(value))
      },
    },
    legend: {
      show: true,
      top: '3%',
      left: 'center',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '25%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: date_list,
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter(value: string | number | null) {
          return renderSize(Number(value))
        },
      },

    }, {
      type: 'value',
      axisLabel: {
        formatter(v: string, i: number) {
          if (i === 0)
            v = '0'

          if (i === 1)
            v = '1'

          if (i === 2)
            v = '3'

          if (i === 3)
            v = '5'

          if (i === 4)
            v = '30'

          if (i === 5)
            v = '1000'

          if (i === 6)
            v = '5000'

          if (i === 7)
            v = '12000'

          return v
        },
      },
    }],
    series: [
      {
        name: '邀请',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: invitation_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '正在做种',
        type: 'line',
        yAxisIndex: 1,
        data: seeding_list,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '正在下载',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: leeching_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
      },
      {
        name: '保种量',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: seeding_size_list,
      },
      {
        name: '下载量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: downloaded_list,
      },
      {
        name: '上传量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: uploaded_list,
      },
      {
        name: '上传增量',
        type: 'bar',
        yAxisIndex: 0,
        barMaxWidth: '60%',
        data: diff_uploaded_list,
      },
      {
        name: '下载增量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        barMaxWidth: '60%',
        data: diff_downloaded_list,
        // tooltip: {
        //     show: false,
        // }
      },
      {
        name: '分享率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },
        data: ratio_list,
      },
      {
        name: '时魔',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: bonus_hour_list,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: any) {
            return value
          },
        },

      },
      {
        name: '魔力值',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        tooltip: {
          show: true,
          trigger: 'axis',
          // formatter: function (params) {
          //    return params.name + '\t' + renderSize(params.data.value)
          // },
          valueFormatter(value: number | 'infinity' | 'Infinity') {
            return numberFormat(value)
          },
        },
        data: bonus_list,
      },
    ],
  }
  // eslint-disable-next-line no-eval
  if (eval(score_list.join('+')) > 0) {
    option.series.push({
      name: '积分',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      tooltip: {
        show: true,
        trigger: 'axis',
        // formatter: function (params) {
        //    return params.name + '\t' + renderSize(params.data.value)
        // },
        valueFormatter(value: number | 'infinity' | 'Infinity') {
          return numberFormat(value)
        },
      },
      data: score_list,
    })
  }
  return option
}
