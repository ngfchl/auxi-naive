<script lang="ts" setup>
import type { JSZipObject } from 'jszip'
import JSZip from 'jszip'
import type { SettledFileInfo } from 'naive-ui/es/upload/src/interface'
import { useGlobalConfig } from '~/composables/gobal-config'
import { useImportStore } from '~/stores/tools/import'

const { message } = useGlobalConfig()
const importStore = useImportStore()
const { importWebsite } = importStore
const { userinfo } = storeToRefs(importStore)

//
/**
 * 解析压缩文件，并获取需要的文件内容
 * @param uploadFile
 */
const handlePreview = (uploadFile: SettledFileInfo) => {
  const fileInfo = uploadFile.file?.file
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
        // if (fileName.includes("userdatas.json")) {
        //   let file = res.file(obj.name)
        //   if (file) {
        //     file.async('text')
        //         .then(response => {
        //           let ptpp = JSON.parse(response);
        //           userinfo.value.userdata = JSON.stringify(ptpp, null, "    ")
        //         })
        //   }
        // }
      }
    })
  })
}

/**
 * 替换当前选中的文件
 * @param files
 */
// const handleExceed: UploadProps['onExceed'] = (files) => {
//   upload.value!.clearFiles()
//   const file = files[0] as UploadRawFile
//   file.uid = genFileId()
//   upload.value!.handleStart(file)
// }
</script>

<template>
  <n-space>
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

  <div class="flex justify-between px-5">
    <div class="w-49% h-100%">
      <h3 class="text-center">
        用户信息
      </h3>
      <n-input
        v-model:value="userinfo.info"
        class="code" type="textarea"
        :rows="30" readonly
        placeholder=""
      />
    </div>
    <div class="w-49% h-100%">
      <h3 class="text-center">
        网站Cookies
      </h3>
      <n-input
        v-model:value="userinfo.cookies"
        class="code" type="textarea"
        :rows="30" readonly
        placeholder=""
      />
    </div>
  </div>
</template>

<style scoped>
.code{
  color: #F2F6FC;
  background-color: #1f2c39 !important;
}
</style>
