import { getList } from '~/hooks/getList'

export interface ParentNode {
  index: string
  name: string
  children: []
}
export const $getSettingsToml: () => Promise<any> = async () => {
  return await getList<null, object>('config/system')
}
