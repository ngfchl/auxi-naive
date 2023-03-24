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
}
export const loginUrl = 'config/login'
/**
 * 登录接口
 * @param params
 */
export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams): Promise<any> => {
  return usePost<UserAccountLoginParams | UserMobileLoginParams, UserLoginResult>(loginUrl, params)
}

export const userGetInfoUrl = 'config/userinfo'
/**
 * 获取用户信息接口
 */
export const userGetInfoApi: () => any = () => {
  return useGet<any, UserInfo>(userGetInfoUrl)
}

const userMenuUrl = 'user/menus'
export const userRoutesApi = () => {
  return useGet<any, MenuInfo[]>(userMenuUrl)
}
