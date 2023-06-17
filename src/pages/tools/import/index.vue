<script lang="ts" setup>
import type { JSZipObject } from 'jszip'
import JSZip from 'jszip'
import type { UploadFileInfo } from 'naive-ui'
import { useGlobalConfig } from '~/composables/gobal-config'
import { useImportStore } from '~/stores/tools/import'

const { message } = useGlobalConfig()
const importStore = useImportStore()
const { importWebsite } = importStore
const { userinfo } = storeToRefs(importStore)

//
/**
 * 解析压缩文件，并获取需要的文件内容
 * @param options
 */
const handlePreview = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const { file } = options
  const fileInfo = file.file
  if (!fileInfo) {
    message?.error('文件读取错误！')
    return
  }
  if (!fileInfo?.type.includes('zip')) {
    message?.warning('请选择正确的ZIP文件！！！')
    return
  }
  JSZip.loadAsync(fileInfo).then((res) => {
    res.forEach((ele, obj: JSZipObject) => {
      if (!obj.dir) {
        // 压缩包内文件名称
        if (!obj)
          return

        const fileName = obj.name
        if (fileName.includes('cookie')) {
          const file = res.file(obj.name)
          if (file) {
            file.async('text').then((response) => {
              const ptpp = JSON.parse(response)
              userinfo.value.cookies = JSON.stringify(ptpp, null, '    ')
            })
          }
        }
        if (fileName.includes('options')) {
          const file = res.file(obj.name)
          if (file) {
            file.async('text')
              .then((response) => {
                const ptpp = JSON.parse(response)
                userinfo.value.info = JSON.stringify(ptpp.sites, null, '    ')
              })
          }
        }
      }
    })
  })
}
</script>

<template>
  <n-space justify="space-between" class="px-5">
    <n-upload
      :default-upload="false"
      @change="handlePreview"
    >
      <n-button type="success">
        选择文件
      </n-button>
    </n-upload>

    <n-button
      type="warning"
      style="margin-bottom: 12px"
      @click="importWebsite"
    >
      上传文件
    </n-button>
  </n-space>

  <n-grid class="flex justify-between px-5" x-gap="5">
    <n-gi span="12">
      <h3 class="text-center">
        用户信息
      </h3>
      <n-input
        v-model:value="userinfo.info"
        :rows="30"
        class="code"
        placeholder=""
        readonly
        type="textarea"
      />
    </n-gi>
    <n-gi span="12">
      <h3 class="text-center">
        网站Cookies
      </h3>
      <n-input
        v-model:value="userinfo.cookies"
        :rows="30"
        class="code"
        placeholder=""
        readonly
        type="textarea"
      />
    </n-gi>
  </n-grid>
</template>

<style scoped>
.code{
  background-color: #FAF5F5 !important;
  font-size: 13px;
  font-family: 'Heiti SC';
  line-height: 16px;
  word-break: break-word;
  border: 1px solid #eee;
  height: 80vh;
  width: 98%;
  border-radius: 5px;
  overflow-y: scroll;
  z-index: 999;
}
</style>
