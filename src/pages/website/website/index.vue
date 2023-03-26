<script setup lang="ts">
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useWebsiteStore } from '~/stores/website'

const { message } = useGlobalConfig()
const websiteStore = useWebsiteStore()
const { getMySiteList } = websiteStore
const {
  columns,
  siteList,
} = storeToRefs(websiteStore)
const rowKey = (row: RowData) => row.id

onMounted(async () => {
  await getMySiteList()
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="siteList"
    :row-key="rowKey"
    size="small"
    bordered
    striped
  />
</template>
