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
  // 获取token信息
  const token = useAuthorization()
  const userStore = useUserStore()
  // 开启进度条
  const { loadingBar } = useGlobalConfig()
  loadingBar?.start()
  // 如果用户信息不存在，就跳转到登录页
  if (!token.value) {
    // 3. 如果不在白名单里面，就跳转到登录页面
    // 如果在白名单里面就直接跳转
    if (allowRouteHasLogin.includes(to.path)) {
      next()
      return
    }
    // 不在白名单里面就跳转到登录页面
    next({
      path: '/login',
      query: {
        redirect: to.path,
      },
    })
    return
  }
  else {
    if (!userStore.userInfo && !allowRoutes.includes(to.path)) {
      try {
        // 如果用户信息不存在，那么就需要获取用户信息
        await userStore.getUserInfo()
        // 检查要跳转的路由是否已经存在于路由列表中
        if (router.getRoutes().some(route => route.path === to.path)) {
          next()
          return
        }
        // 调用获取路由信息

        // 处理动态路由 前端处理
        // const currentRouter = await userStore.generateRoutes()
        // if (currentRouter && !router.getRoutes().some(route => route.path === currentRouter.path)) {
        //   await router.addRoute(currentRouter)
        //   // next({ path: to.path, replace: true })
        //   next({
        //     ...to,
        //     replace: true,
        //   })
        //   return
        // }
        // 处理动态路由 后端输出
        const routerRecord = await userStore.generateDynamicRoutes()
        if (routerRecord) {
          await router.addRoute(routerRecord)
          next({
            ...to,
            replace: true,
          })
          return
        }
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
        else {
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
