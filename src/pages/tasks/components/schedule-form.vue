<script lang="ts" setup>
import type { MySite, WebSite } from '~/api/website'

const taskStore = useTaskStore()
const {
  refScheduleForm,
  scheduleForm,
  addScheduleFormRules,
  taskSelectList,
} = storeToRefs(taskStore)
const {
  saveSchedule,
  removeSchedule,
} = taskStore
const websiteStore = useWebsiteStore()
const {
  mySiteList, siteList,
} = storeToRefs(websiteStore)
const {
  getMySiteList, getSiteList,
} = websiteStore
const downloadStore = useDownloadStore()
const { getDownloaderList } = downloadStore
const { downloaderList } = storeToRefs(downloadStore)
const taskBySite = [
  'schedule.tasks.auto_get_rss',
  'schedule.tasks.auto_get_torrents',
  // 'schedule.tasks.auto_sign_in',
  // 'schedule.tasks.auto_get_status',
  'schedule.tasks.auto_remove_brush_task',
  'schedule.tasks.auto_push_to_downloader',
]
const taskByDownloader = [
  'schedule.tasks.auto_torrents_package_files',
]
const showSiteList = ref<MySite[]>([])

const loading = ref(false)
const handleSave = async () => {
  loading.value = true
  await saveSchedule()
  loading.value = false
}
const handleChange = async (value: string) => {
  const functionMap = {
    'schedule.tasks.auto_get_rss': 'brush_rss',
    'schedule.tasks.auto_get_torrents': 'brush_free',
    'schedule.tasks.auto_push_to_downloader': 'brush_free',
    'schedule.tasks.auto_sign_in': 'sign_in',
    'schedule.tasks.auto_get_status': 'get_info',
    'schedule.tasks.auto_remove_brush_task': 'brush_free',
    'schedule.tasks.auto_get_hash_by_category': 'brush_free',
  }
  showSiteList.value = mySiteList.value.filter((mySite: MySite) => {
    // return mySite[functionMap[value]] && siteList.value.find((website: WebSite) => website.id === mySite.site)[functionMap[value]]
    return mySite.torrents?.startsWith('https://') && siteList.value.find((website: WebSite) => website.id === mySite.site)[functionMap[value]]
  })
}
onMounted(async () => {
  await getMySiteList()
  await getSiteList()
  await getDownloaderList()
  if (scheduleForm.value.id !== 0)
    await handleChange(scheduleForm.value.task)
})
</script>

<template>
  <n-form
    :ref="refScheduleForm"
    :model="scheduleForm"
    :rules="addScheduleFormRules"
    class="site-form"
    inline-message
    label-placement="left"
    status-icon
    size="small"
  >
    <n-form-item label="选择任务" path="task">
      <n-select
        v-model:value="scheduleForm.task"
        :disabled="scheduleForm.id !== 0"
        :placeholder="scheduleForm.id !== 0 ? '' : '请选择要添加的任务'"
        :options="taskSelectList"
        filterable
        @update:value="handleChange"
      />
    </n-form-item>
    <n-form-item label="任务名称" path="name">
      <n-input
        v-model:value="scheduleForm.name"
        clearable
        placeholder="请为你的任务命名"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="开启任务" path="enabled" required inline>
      <n-switch v-model:value="scheduleForm.enabled" :round="false" />
    </n-form-item>
    <n-form-item label="时间分钟" path="crontab.minute" required>
      <n-input
        v-model:value="scheduleForm.crontab.minute"
        clearable
        placeholder="执行时间：分钟，支持Crontab表达式"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="时间小时" path="crontab.hour" required>
      <n-input
        v-model:value="scheduleForm.crontab.hour"
        clearable
        placeholder="执行时间：小时，支持Crontab表达式"
        show-word-limit
      />
    </n-form-item>
    <n-form-item v-if="scheduleForm.task.length > 0 && taskBySite.includes(scheduleForm.task)" label="选择站点" path="args" label-placement="top">
      <n-transfer
        ref="transfer"
        v-model:value="scheduleForm.args"
        virtual-scroll
        :options="showSiteList.map((v, i) => ({
          label: v.nickname,
          value: v.id,
        }))"
        source-filterable
      />
      <!--      <n-popselect -->
      <!--        v-model:value="scheduleForm.args" -->
      <!--        scrollable multiple :options="showSiteList.map((v, i) => ({ -->
      <!--          label: v.nickname, -->
      <!--          value: v.id, -->
      <!--        }))" -->
      <!--      > -->
      <!--        <n-button style="margin-right: 8px"> -->
      <!--          {{ Array.isArray(scheduleForm.args) && scheduleForm.args.length ? scheduleForm.args : '请选择站点' }} -->
      <!--        </n-button> -->
      <!--      </n-popselect> -->
    </n-form-item>
    <n-form-item
      v-if="scheduleForm.task.length > 0 && taskByDownloader.includes(scheduleForm.task)"
      label="选择下载器" path="args" label-placement="top"
    >
      <n-transfer
        ref="transfer"
        v-model:value="scheduleForm.args"
        virtual-scroll
        :options="downloaderList.map((v, i) => ({
          label: v.name,
          value: v.id,
        }))"
        source-filterable
      />
    </n-form-item>
  </n-form>
  <n-space justify="center">
    <n-popconfirm
      v-if="scheduleForm.id !== 0"
      @positive-click="removeSchedule(scheduleForm.id)"
    >
      <template #trigger>
        <n-button type="error">
          删 除
        </n-button>
      </template>
      确定删除此任务吗？
    </n-popconfirm>

    <n-button
      type="primary" :loading="loading"
      @click="handleSave"
    >
      保存
    </n-button>
  </n-space>
</template>

<style scoped>

</style>
