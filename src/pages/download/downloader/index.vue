<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { Downloader } from '~/api/download'
import { useGlobalConfig } from '~/composables/gobal-config'

const downloadStore = useDownloadStore()
const { getDownloaderList } = downloadStore
const { downloaderList } = storeToRefs(downloadStore)
const { message } = useGlobalConfig()
const columns = [
  {
    title: '名称',
    key: 'name',
    dataKey: 'name',
    width: 150,
  }, {
    title: '地址',
    dataKey: 'host',
    key: 'host',
    width: 150,
  }, {
    title: '类型',
    dataKey: 'category',
    key: 'category',
    width: 150,
  },
  {
    key: 'actions',
    title: '操作',
    render(row: Downloader) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => message.warning(`下载器ID：${row.id}`),
        },
        { default: () => '操作' },
      )
    },
    width: 150,
    align: 'center',
  },
]

onMounted(async () => {
  await getDownloaderList()
})
</script>

<template>
  <n-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>下载器</span>
        <div class="flex-grow" />
        <span class="header-button">
          <NButton type="success">
            添加
          </NButton>
        </span>
      </div>
    </template>
    <div style="height: 100vh;">
      <n-data-table
        :columns="columns"
        :data="downloaderList"
        striped
        bordered
      />
    </div>
  </n-card>
</template>
