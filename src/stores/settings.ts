import type { ParentData, ParentNode } from '~/api/settings'
import { $getSettingsFile, $getSettingsToml, $saveSettingsFile } from '~/api/settings'

export const useSettingsStore = defineStore('settings', () => {
  const treeData = ref<ParentNode>({
    index: 'root',
    name: 'Root',
    children: [],
  })

  const content = ref('')

  const buildTree = (data: ParentData, parentNode: ParentNode) => {
    parentNode.children.length = 0
    for (const key in data) {
      const node = {
        index: key,
        name: typeof data[key] === 'object' ? '' : data[key],
        children: [],
      }
      parentNode.children.push(node as ParentNode)

      if (typeof data[key] === 'object')
        buildTree(data[key] as ParentData, node as ParentNode)
    }
  }
  const getSettingsToml = async () => {
    const data: ParentData = await $getSettingsToml()
    buildTree(data, treeData.value)
  }
  const setContent = async (value: string) => {
    content.value = value
  }
  const getSettingsFile = async (name: string) => {
    await setContent(await $getSettingsFile({ name }))
  }

  const saveSettingsFile = async (name: string) => {
    const flag = await $saveSettingsFile({
      name,
      content: content.value,
    })
    if (flag) await getSettingsFile(name)
  }
  return {
    getSettingsToml,
    getSettingsFile,
    saveSettingsFile,
    setContent,
    content,
    treeData,
  }
})
