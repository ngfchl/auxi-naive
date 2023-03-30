<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NSwitch } from 'naive-ui'
import type { Downloader } from '~/api/download'
import { useGlobalConfig } from '~/composables/gobal-config'
import type { Schedule } from '~/api/tasks'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const downloadStore = useDownloadStore()
const { getDownloaderList, editDownloader } = downloadStore
const { downloaderList, columns } = storeToRefs(downloadStore)
const { message } = useGlobalConfig()

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
        striped
        bordered
      />
    </div>
  </n-card>
</template>
