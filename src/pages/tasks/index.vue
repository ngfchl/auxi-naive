<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
const { isMobile, isPad, isDesktop } = useQueryBreakPoints()
const taskStore = useTaskStore()
const {
  columns,
  taskList,
  scheduleList,
} = storeToRefs(taskStore)
const {
  getTaskList,
  getScheduleList,
  editSchedule,
} = taskStore
const loading = ref<Boolean>(false)
const rowKey = (row: RowData) => row.task
onBeforeMount(async () => {
  loading.value = true
  await getScheduleList()
  loading.value = false
})
</script>

<template>
  <n-space class="mb-2 flex items-center">
    <n-button
      type="warning"
      size="small"
      class="flex items-center"
      @click="getScheduleList"
    >
      <MenuIcon icon="RefreshSharp" />
    </n-button>
    <n-button
      size="small"
      type="success"
      @click="editSchedule(0)"
    >
      添加
    </n-button>
  </n-space>
  <n-data-table
    :columns="columns"
    :data="scheduleList"
    :loading="loading"
    :min-height="isMobile ? 520 : 680"
    :row-key="rowKey"
    bordered
    flex-height
    max-height="720"
    size="small"
    striped
  />
</template>

<style scoped>

</style>
