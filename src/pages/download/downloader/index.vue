<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useGlobalConfig } from '~/composables/gobal-config'

const downloadStore = useDownloadStore()
const { getDownloaderList, editDownloader } = downloadStore
const { downloaderList, columns } = storeToRefs(downloadStore)
const { message } = useGlobalConfig()
const loading = ref<Boolean>(false)

onMounted(async () => {
  loading.value = true
  await getDownloaderList()
  loading.value = false
})
</script>

<template>
  <n-card hoverable embedded>
    <template #header>
      <n-space justify="space-between">
        <span>下载器</span>
        <NButton type="success" size="small" @click="editDownloader(0)">
          添加
        </NButton>
      </n-space>
    </template>
    <div style="height: 100%;">
      <n-data-table
        :columns="columns"
        :data="downloaderList"
        :loading="loading"
        striped
        bordered
      />
    </div>
  </n-card>
</template>
