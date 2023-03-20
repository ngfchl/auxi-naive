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
