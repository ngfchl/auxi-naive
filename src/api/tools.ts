
export const useImport = async (params: object) => {
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
