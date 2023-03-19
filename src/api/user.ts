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
export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams): Promise<any> => {
  return usePost<UserAccountLoginParams | UserMobileLoginParams, UserLoginResult>(loginUrl, params)
}
