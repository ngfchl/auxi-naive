export const getList = async <P = any, T = any>(url: string, params?: P) => {
  return await useGet<P, T | T[]>(url, params)
}
