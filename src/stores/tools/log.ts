import type { SelectOption } from 'naive-ui'
import { $downloadLog, $getLogContent, $getLogList, $removeLog } from '~/api/tools'

export const useLogStore = defineStore('logs', () => {
  const names = ref<string[]>([])
  const content = ref<string[]>()
  const currentLog = ref<string>('logs.log')
  const currentLogContent = ref<string>('')
  const logList = ref<SelectOption[]>([{
    label: '请选择',
  }])
  const getNames = async () => {
    names.value = await $getLogList()
    names.value.forEach((name) => {
      logList.value.push({
        label: name,
        value: name,
      })
    })
  }
  const getLogContent = async (file_name: string) => {
    currentLogContent.value = await $getLogContent(file_name)
  }

  const downloadLog = async (file_name: string) => {
    await $downloadLog(file_name)
  }

  const removeLog = async (file_name: string) => {
    await $removeLog(file_name)
  }
  return {
    names,
    content,
    currentLog,
    currentLogContent,
    logList,
    getNames,
    getLogContent,
    downloadLog,
    removeLog,
  }
})
