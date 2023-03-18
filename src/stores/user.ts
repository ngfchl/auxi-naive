import { userLoginApi } from '~/api/user'
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
  const userLogin = async (params: UserAccountLoginParams | UserMobileLoginParams) => {
    const { data } = await userLoginApi(params)
    if (data?.token)
      setToken(data.token)
  }
  return {
    userInfo,
    setUserInfo,
    setToken,
    userLogin,
  }
})
