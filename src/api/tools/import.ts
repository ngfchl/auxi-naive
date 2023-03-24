export interface Import {
  info: string
  cookies: string
  userdata: string
}

export const $import = async (params: Import) => {
  const { message, loadingBar } = useGlobalConfig()
  loadingBar?.start()
  const { code, msg } = await usePost('mysite/import', params)
  switch (code) {
    case 0:
      message?.success(msg)
      loadingBar?.finish()
      return true
    default:
      message?.error(msg)
      loadingBar?.finish()
      return false
  }
}
