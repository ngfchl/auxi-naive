export interface Import {
  info: string
  cookies: string
  userdata: string
}

export const $import = async (params: Import) => {
  const { msg, code } = await usePost('mysite/import', params)
  const { message } = useGlobalConfig()
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
