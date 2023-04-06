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
  <n-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>下载器</span>
        <div class="flex-grow" />
        <span class="header-button">
          <NButton type="success" @click="editDownloader(0)">
            添加
          </NButton>
        </span>
      </div>
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
