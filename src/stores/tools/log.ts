import type { SelectOption } from 'naive-ui'
import { $downloadLog, $getLogContent, $getLogList, $removeLog } from '~/api/tools'

export const useLogStore = defineStore('logs', () => {
  const names = ref<string[]>([])
  const content = ref<string[]>()
  const currentLog = ref<string>('logs.log')
  const currentLogContent = ref<string>('')
  const loading = ref(false)
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
    loading.value = true
    currentLogContent.value = ''
    currentLogContent.value = await $getLogContent(file_name)
    loading.value = false
  }

  const downloadLog = async () => {
    await $downloadLog(currentLog.value)
  }

  const removeLog = async () => {
    loading.value = true
    const flag = await $removeLog(currentLog.value)
    if (flag) {
      await getNames()
      currentLog.value = 'logs.log'
      await getLogContent(currentLog.value)
    }
    loading.value = false
  }
  return {
    names,
    content,
    currentLog,
    currentLogContent,
    logList,
    loading,
    getNames,
    getLogContent,
    downloadLog,
    removeLog,
  }
})
