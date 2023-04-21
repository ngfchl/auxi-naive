<script setup lang="ts">
import type { Torrent } from '~/api/download'

const downloadStore = useDownloadStore()
const {
  getDownloading,
} = downloadStore
const {
  downloading, downloadingColumns,
} = storeToRefs(downloadStore)
const loading = ref(false)
const rowKey = (row: Torrent) => row.hash
onMounted(async () => {
  loading.value = true
  await getDownloading(3)
  loading.value = false
})
</script>

<template>
  <n-card hoverable embedded>
    <template #header>
      <n-space justify="space-between">
        <span>任务管理</span>
      </n-space>
    </template>

    <div style="height: 100%;">
      <n-data-table
        :columns="downloadingColumns"
        :data="downloading.torrents"
        :loading="loading"
        :row-key="rowKey"
        :max-height="750"
        class="text-8px!"
        size="small"
        striped
        bordered
      />
    </div>
  </n-card>
</template>

<style scoped>
.n-data-table {
    font-size: 9px !important;
}
</style>
