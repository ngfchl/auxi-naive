<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useWebsiteStore } from '~/stores/website'

const { message } = useGlobalConfig()
const websiteStore = useWebsiteStore()
const { getSiteList } = websiteStore
const {
  columns,
  siteList,
} = storeToRefs(websiteStore)
const rowKey = (row: RowData) => row.id
const loading = ref<Boolean>(false)
onMounted(async () => {
  loading.value = true
  await getSiteList()
  loading.value = false
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="siteList"
    :row-key="rowKey"
    size="small"
    :loading="loading"
    bordered
    striped
  />
</template>
