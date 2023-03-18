import type { UserInfo } from '~/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()

  const token = useAuthorization()

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  const setToken = (val: string) => {
    token.value = val
  }

  return {
    userInfo,
    setUserInfo,
    setToken,
  }
})
