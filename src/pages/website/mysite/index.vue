<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'
const { isMobile, isPad, isDesktop } = useQueryBreakPoints()

const websiteStore = useWebsiteStore()
const {
  mySiteList,
  mySiteColumns,
} = storeToRefs(websiteStore)

const {
  getMySiteList, getSiteList, editMysite, handleUpdateSorter,
} = websiteStore
const loading = ref<Boolean>(false)
const reloadData = async () => {
  loading.value = true
  await getMySiteList()
  loading.value = false
}
onMounted(async () => {
  loading.value = true
  await getSiteList()
  await getMySiteList()
  loading.value = false
})
</script>

<template>
  <n-space class="pt-2 mb-1" justify="start">
    <n-button
      size="small"
      type="success"
      @click="editMysite(0)"
    >
      添加
    </n-button>
    <n-button
      size="small"
      type="warning"
      @click="reloadData"
    >
      刷新
    </n-button>
  </n-space>
  <n-data-table
    :columns="mySiteColumns"
    :data="mySiteList"
    :loading="loading"
    :min-height="isMobile ? 520 : 680"
    :row-key="(row: RowData) => row.id"
    bordered
    flex-height
    max-height="720"
    size="small"
    striped
    @update:sorter="handleUpdateSorter"
  />
</template>

<style scoped>

</style>
