<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import { useLogStore } from '~/stores/tools/log'

const logStore = useLogStore()
const {
  names,
  content,
  currentLog,
  logList,
  currentLogContent,
} = storeToRefs(logStore)
const {
  getNames,
  getLogContent,
  downloadLog,
  removeLog,
} = logStore

const loading = ref(false)
onMounted(async () => {
  await getNames()
  await getLogContent(currentLog.value)
})
const handleRequireMore = async (from: 'top') => {
  if (from === 'top') {
    loading.value = true
    await getLogContent(currentLog.value)
    loading.value = false
  }
}
const handleChangeLog = async () => {
  loading.value = true
  await getLogContent(currentLog.value)
  loading.value = false
}
</script>

<template>
  <n-space justify="start" class="px">
    <n-select
      v-model:value="currentLog"
      :options="logList"
      style="min-width:50vw;"
      @update:value="handleChangeLog"
    />
    <n-button type="primary">
      下载
    </n-button>
    <n-button type="error">
      删除
    </n-button>
  </n-space>
  <n-log
    :loading="loading"
    :log="currentLogContent"
    :rows="40"
    :hljs="hljs"
    class="px mt-2"
    line-height="2"
    @require-more="handleRequireMore"
  />
</template>

<style scoped>

</style>
