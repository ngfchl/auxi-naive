import { useGlobalConfig } from '~/composables/gobal-config'
import type { IncludeNull } from '~/utils/types'

export interface UserInfo {
  id: number
  username: string
  email?: string
  mobile?: string
  avatar: string
  signature?: string
  realName?: string
  birth?: string
}

export interface MenuInfo {
  id: number
  pid?: number | null
  path: string
  name?: string
  title: string
  component?: string
  icon?: string
  redirect?: string
  keepAlive?: boolean
}

export interface UserAccountLoginParams {
  username: IncludeNull<string>
  password: IncludeNull<string>
  captcha?: IncludeNull<string>
  rememberMe?: IncludeNull<boolean>
}

export interface UserMobileLoginParams {
  mobile: IncludeNull<string>
  code: IncludeNull<string>
  type: 'mobile'
  rememberMe: IncludeNull<boolean>
}

export interface UserLoginResult {
  token: IncludeNull<string>
  user: string
}
export interface GitLog {
  date: string
  data: string
  hex: string
}
export interface GitLogSchema {
  local_logs: GitLog
  update_notes: GitLog[]
  update: boolean
}

const { message } = useGlobalConfig()
export const loginUrl = 'config/login'
/**
 * 登录接口
 * @param params
 */
export const userLoginApi = async (params: UserAccountLoginParams | UserMobileLoginParams): Promise<any> => {
  return await usePost<UserAccountLoginParams | UserMobileLoginParams, UserLoginResult>(loginUrl, params)
}

export const userGetInfoUrl = 'config/userinfo'
/**
 * 获取用户信息接口
 */
export const userGetInfoApi = async () => {
  const {
    code,
    msg,
    data,
  } = await useGet<any, UserInfo>(userGetInfoUrl)
  switch (code) {
    case 0:
      return data
    default:
      message?.warning(msg)
      return false
  }
}

const userMenuUrl = 'user/menus'
export const userRoutesApi = () => {
  return useGet<any, MenuInfo[]>(userMenuUrl)
}

export const $getGitLog = async () => {
  const { message } = useGlobalConfig()

  const {
    code,
    msg,
    data,
  } = await useGet('config/update/log')

  switch (code) {
    case 0:
      return data
    default:
      message?.error(msg)
      return false
  }
}
