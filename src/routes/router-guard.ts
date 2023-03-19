import { AxiosError } from 'axios'
import router from '~/routes/index'

/**
 * 路由白名单：登录页
 */
export const loginRoute = '/login'
export const allowRoutes = ['/404', '/401', '/500', '/403', '/error']

/**
 * 路由白名单：出错页
 */
export const allowRouteHasLogin = [...allowRoutes, loginRoute]
/**
 * 路由前置函数
 */
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  const { loadingBar } = useGlobalConfig()
  loadingBar?.start()
  // 获取token信息
  const token = useAuthorization()

  const userStore = useUserStore()
  // 如果用户信息不存在，就跳转到登录页
  if (!token.value) {
    if (!allowRouteHasLogin.includes(to.path)) {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
      return
    }
  }
  else {
    if (!userStore.userInfo && !allowRoutes.includes(to.path)) {
      try {
        // 如果用户信息不存在，那么就需要获取用户信息
        await userStore.getUserInfo()
        // 判断当前是不是登录页面，如果是登录页面，那么就跳转到首页
        if (to.path === loginRoute) {
          // 跳转至首页
          next({
            path: '/',
          })
          return
        }
      }
      catch (e) {
        // 判断当前如果是401的错误让给请求拦截处理
        if (e instanceof AxiosError) {
          if (e.response?.status === 401)
            return
        }
        // 如果获取用户信息失败，那么我们直接阻止用户跳转并同时跳转到Error页面
        next({
          path: '/error',
          query: {
            redirect: to.path,
          },
        })
        return
      }
    }
  }
  next()
})
/**
 * 路由后置函数
 */
router.afterEach((to) => {
  const appStore = useAppStore()
  const { loadingBar } = useGlobalConfig()
  const title = to.meta?.title
  loadingBar?.finish()
  if (title) { document.title = `${title} - ${appStore.layout.title}` }
  else {
    if (appStore.layout.title)
      document.title = appStore.layout.title
  }
})
