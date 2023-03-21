import { omit } from 'lodash-es'
import { useGlobalConfig } from '~/composables/gobal-config'
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
  const { message } = useGlobalConfig()
  const closeTab = (path?: string) => {
    if (!path)
      path = current.value

    if (tabList.value.length <= 1) {
      message?.error('最后一个了')
      return
    }
    const currentIndex = tabList.value.findIndex(item => item.path === path)
    if (path !== current.value) {
      state.tabList.splice(currentIndex, 1)
      return
    }
    const targetIndex = currentIndex === 0 ? currentIndex + 1 : currentIndex - 1
    router.replace(tabList.value[targetIndex].route!).then(() => state.tabList.splice(currentIndex, 1))
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
        route: omit(route, ['matched']),
      }
      state.tabList.push(item)
    }
  }, {
    immediate: true,
  })
  return {
    tabList, current, closeTab,
  }
}
