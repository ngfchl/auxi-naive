const menuState = () => {
  const state = reactive({
    active: '',
  })
  const route = useRoute()
  const updateActive = (active: string) => {
    state.active = active
  }
  watch(() => route.fullPath, () => {
    updateActive(route.path)
  })
  return {
    ...toRefs(state),
    updateActive,
  }
}

const [useMenuStateProvider, useMenuStateInject] = createInjectionState(menuState)
export const useMenuState = () => {
  return useMenuStateInject() ?? {
    active: ref(''),
    updateActive: () => {},
  }
}
export {
  useMenuStateProvider,
}
