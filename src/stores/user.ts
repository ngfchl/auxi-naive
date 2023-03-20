import type { RouteRecordRaw } from 'vue-router'
import { userGetInfoApi, userLoginApi } from '~/api/user'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '~/api/user'
import router from '~/routes'
import i18n from '~/locales'
import { dynamicRoutes, rootRouter } from '~/routes/dynamic-routes'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const t = i18n.global.t
  const { message } = useGlobalConfig()
  const token = useAuthorization()
  const routerRecords = ref<RouteRecordRaw[]>([])

  /**
   * 分配用户信息
   * @param info
   */
  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }

  /**
   * 设置TOKEN
   * @param val
   */
  const setToken = (val: string | null) => {
    token.value = val
  }

  /**
   * 登录
   * @param params
   */
  const userLogin = async (params: UserAccountLoginParams | UserMobileLoginParams): Promise<any> => {
    const res = await userLoginApi(params)
    if (res) {
      setToken(res.auth_token)
      return true
    }
  }

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    const { data } = await userGetInfoApi()
    if (data)
      setUserInfo(data)
  }

  /**
   * 注销登录
   */
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

  /**
   * 动态生成路由
   */
  const generateRoutes = async () => {
    const currentRouter = {
      ...rootRouter,
      children: dynamicRoutes,
    }
    routerRecords.value = dynamicRoutes
    return currentRouter
  }

  return {
    userInfo,
    setUserInfo,
    setToken,
    userLogin,
    getUserInfo,
    logout,
    routerRecords,
    generateRoutes,
  }
})
