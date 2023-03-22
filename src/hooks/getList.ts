export const getList = async <P = any, T = any>(url: string, params?: P) => {
  const { data } = await useGet<P, T[]>(url, params)
  return data
}
