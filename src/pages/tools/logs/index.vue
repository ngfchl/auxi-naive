<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import { useLogStore } from '~/stores/tools/log'

const logStore = useLogStore()
const {
  names,
  content,
  currentLog,
  logList,
  loading,
  currentLogContent,
} = storeToRefs(logStore)
const {
  getNames,
  getLogContent,
  downloadLog,
  removeLog,
} = logStore

onMounted(async () => {
  await getNames()
  await getLogContent(currentLog.value)
})
const handleRequireMore = async (from: 'top') => {
  if (from === 'top')
    await getLogContent(currentLog.value)
}
const handleChangeLog = async () => {
  await getLogContent(currentLog.value)
}
</script>

<template>
  <n-space justify="start" class="px pt-5px mb-2px">
    <n-select
      v-model:value="currentLog"
      :options="logList"
      style="min-width:50vw;"
      @update:value="handleChangeLog"
    />
    <!--    <n-button type="primary" @click="downloadLog"> -->
    <!--      下载 -->
    <!--    </n-button> -->
    <n-button type="error" @click="removeLog">
      删除
    </n-button>
  </n-space>
  <n-log
    :loading="loading"
    :log="currentLogContent"
    :rows="40"
    :hljs="hljs"
    class="px mt-2 code"
    :line-height="2"
    @require-more="handleRequireMore"
  />
</template>

<style scoped>
.code {
  color: #F2F6FC;
  background-color: #1f2c39 !important;
  font-size: 13px;
  font-family: 'Heiti SC';
  line-height: 18px;
  word-break: break-word;
  border: 1px solid #eee;
  height: 75vh;
  width: 98%;
  margin: auto;
  border-radius: 5px;
  overflow-y: scroll;
}
</style>
