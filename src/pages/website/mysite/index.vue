<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'

const websiteStore = useWebsiteStore()
const {
  mySiteList,
  mySiteColumns,
} = storeToRefs(websiteStore)

const {
  getMySiteList, getSiteList,
} = websiteStore
const loading = ref<Boolean>(false)

onMounted(async () => {
  loading.value = true
  await getSiteList()
  await getMySiteList()
  loading.value = false
})
</script>

<template>
  <n-data-table
    :columns="mySiteColumns"
    :data="mySiteList"
    :row-key="(row: RowData) => row.id"
    size="small"
    :loading="loading"
    bordered
    striped
  />
</template>

<style scoped>

</style>
