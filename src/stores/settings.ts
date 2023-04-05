import type { ParentNode } from '~/api/settings'
import { $getSettingsToml } from '~/api/settings'

export const useSettingsStore = defineStore('settings', () => {
  const treeData = ref<ParentNode>({
    index: 'root',
    name: 'Root',
    children: [],
  })

  const buildTree = (data: object, parentNode: ParentNode) => {
    parentNode.children.length = 0
    for (const key in data) {
      const node = {
        index: key,
        name: typeof data[key] === 'object' ? '' : data[key],
        children: [],
      }
      parentNode.children.push(node)

      if (typeof data[key] === 'object')
        buildTree(data[key], node)
    }
  }
  const getSettingsToml = async () => {
    const data: object = await $getSettingsToml()
    buildTree(data, treeData.value)
  }
  return {
    getSettingsToml,
    treeData,
  }
})
