import { userGetInfoApi, userLoginApi } from '~/api/user'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '~/api/user'
import router from '~/routes'
import i18n from '~/locales'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const t = i18n.global.t
  const { message } = useGlobalConfig()
  const token = useAuthorization()

  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }

  const setToken = (val: string | null) => {
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

  const logout = async () => {
    setToken(null)
    setUserInfo(undefined)
    message?.success(t('global.layout.header.right.logout.success'), { duration: 3000 })
    await router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }
  return {
    userInfo,
    setUserInfo,
    setToken,
    userLogin,
    getUserInfo,
    logout,
  }
})
