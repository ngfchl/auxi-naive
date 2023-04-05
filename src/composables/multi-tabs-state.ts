import { omit } from 'lodash-es'
import type { TabItem } from '~/layouts/multi-tab/type'
import { MULTI_TAB_STATE_KEY } from '~/layouts/multi-tab/type'

export const useMultiTabProvider = () => {
  const state = reactive({
    tabList: [],
    current: '',
  })
  provide(MULTI_TAB_STATE_KEY, state)
  return state
}

export const useMultiTabInject = () => {
  return inject(MULTI_TAB_STATE_KEY)!
}

export const useMultiTab = () => {
  const state = useMultiTabInject()
  const tabList = computed(() => state.tabList)
  const current = computed(() => state.current)
  const route = useRoute()
  const router = useRouter()
  const closeTab = (path?: string) => {
    if (!path)
      path = current.value
    // 只有最后一页时，关掉就替换为首页
    if (tabList.value.length <= 1) {
      router.replace({
        path: '/',
      }).then(() => {})
      state.tabList.splice(0, 1)
    }
    // 关闭的不是当前页，依旧显示当前页
    const currentIndex = tabList.value.findIndex(item => item.path === path)
    if (path !== current.value) {
      state.tabList.splice(currentIndex, 1)
      return
    }
    // 关闭当前页 是第一页就显示后面一页，不是就显示前面一页
    const targetIndex = currentIndex === 0 ? currentIndex + 1 : currentIndex - 1
    router.replace(tabList.value[targetIndex].route!).then(() => state.tabList.splice(currentIndex, 1))
  }
  const refreshTab = (path?: string) => {
    if (!path)
      path = current.value
    router.replace({
      path: `/redirect/${path}`,
    }).then(() => {}).catch(() => {})
  }
  watch(() => route.fullPath, () => {
    if (current.value !== route.path)
      state.current = route.path
    const tabIndex = tabList.value.findIndex(tab => tab.path === route.path)
    if (tabIndex !== -1) {
      // 更新一下路由信息
      state.tabList[tabIndex].route = omit(route, ['matched'])
    }
    else {
      // 添加路由信息
      const item: TabItem = {
        path: route.path,
        tabTitle: route.meta.title ?? '',
        icon: route.meta.icon ?? '',
        route: omit(route, ['matched']),
      }
      state.tabList.push(item)
    }
  }, {
    immediate: true,
  })
  return {
    tabList, current, closeTab, refreshTab,
  }
}
