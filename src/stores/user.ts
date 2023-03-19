import { userGetInfoApi, userLoginApi } from '~/api/user'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '~/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()

  const token = useAuthorization()

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  const setToken = (val: string) => {
    token.value = val
  }
  const userLogin = async (params: UserAccountLoginParams | UserMobileLoginParams): Promise<any> => {
    const res = await userLoginApi(params)
    if (res) {
      setToken(res.auth_token)
      return true
    }
  }

  const getUserInfo = async () => {
    const { data } = await userGetInfoApi()
    if (data)
      setUserInfo(data)
  }
  return {
    userInfo,
    setUserInfo,
    setToken,
    userLogin,
    getUserInfo,
  }
})
