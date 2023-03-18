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
  username: string
  password: string
  captcha?: string
}

export interface UserMobileLoginParams {
  mobile: string
  code: string
  type: 'mobile'
}
export interface UserLoginResult {
  token: string
}
export const loginUrl = 'config/login'
export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams) => {
  return usePost<UserAccountLoginParams | UserMobileLoginParams, UserLoginResult>(loginUrl, params)
}
