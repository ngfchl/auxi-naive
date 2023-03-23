import type { FormRules } from 'naive-ui'

interface MySite {
  id: number
  site: number | null
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
  time_join: string
  user_agent: string
  cookie: string
}

interface SiteHistoryList {
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

const mySite = reactive<MySite>({
  id: 0,
  site: null,
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
  time_join: '2023-01-01 12:00:00',
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

export { addMySiteFormRules, mySite }
export type { MySite, SiteHistoryList }
