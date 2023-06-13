<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { Downloader } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const websiteStore = useWebsiteStore()
const { refMySiteForm, mySiteForm, siteInfoList, addMySiteFormRules } = storeToRefs(websiteStore)
const { saveMySite, removeMySite } = websiteStore
const downloaderStore = useDownloadStore()
const { downloaderList } = storeToRefs(downloaderStore)
const { getDownloaderList } = downloaderStore
const loading = ref(false)
const handleSaveMySite = async () => {
  loading.value = true
  try {
    await saveMySite()
  }
  catch (e) {
    console.error(e)
  }
  loading.value = false
}
onMounted(async () => {
  await getDownloaderList()
})
</script>

<template>
  <div>
    <n-form
      :ref="refMySiteForm"
      :model="mySiteForm"
      :rules="addMySiteFormRules"
      class="site-form"
      :show-label="false"
      inline-message
      label-position="top"
      size="small"
      status-icon
    >
      <n-form-item v-if="mySiteForm.id === 0" label="选择站点" path="site">
        <n-select
          v-model:value="mySiteForm.site"
          :disabled="mySiteForm.id !== 0"
          :placeholder="mySiteForm.id !== 0 ? '' : '请选择要添加的站点'"
          :options="siteInfoList"
          filterable
        />
      </n-form-item>
      <n-form-item label="站点昵称" path="nickname">
        <n-input
          v-model:value="mySiteForm.nickname"
          clearable
          maxlength="8"
          show-count
          placeholder="自定义站点名称，必填"
          show-word-limit
        />
      </n-form-item>
      <n-form-item label="功能开关" required>
        <n-space>
          <n-switch
            v-model:value="mySiteForm.get_info"
            :round="false"
            border
          >
            <template #checked>
              数据
            </template>
            <template #unchecked>
              数据
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.sign_in" :round="false" border label="">
            <template #checked>
              签到
            </template>
            <template #unchecked>
              签到
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.search" :round="false" border label="">
            <template #checked>
              搜索
            </template>
            <template #unchecked>
              搜索
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.brush_free" :round="false" border label="">
            <template #checked>
              Free刷流
            </template>
            <template #unchecked>
              Free刷流
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.brush_rss" :round="false" border label="">
            <template #checked>
              RSS刷流
            </template>
            <template #unchecked>
              RSS刷流
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.repeat_torrents" :round="false" border label="">
            <template #checked>
              辅种
            </template>
            <template #unchecked>
              辅种
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
          <n-switch v-model:value="mySiteForm.hr" :round="false" border label="">
            <template #checked>
              H&R
            </template>
            <template #unchecked>
              H&R
            </template>
            <template #checked-icon>
              <MenuIcon icon="Checkbox" size="24" color="green" />
            </template>
            <template #unchecked-icon>
              <MenuIcon icon="CloseSharp" size="18" color="darkred" />
            </template>
          </n-switch>
        </n-space>
      </n-form-item>

      <n-form-item label="用户UID" path="user_id">
        <n-input
          v-model:value="mySiteForm.user_id" clearable
          placeholder="请输入数字UID，AZ,CZ,EZ,Reel，莫妮卡、普斯特等请填写用户名"
          show-word-limit
          maxlength="10"
          show-count
        />
      </n-form-item>
      <n-form-item label="Passkey" path="passkey">
        <n-input
          v-model:value="mySiteForm.passkey" clearable
          placeholder="Passkey"
          maxlength="32"
          show-count
          show-word-limit
        />
      </n-form-item>
      <n-form-item label="Cookies" path="cookie">
        <n-input
          v-model:value="mySiteForm.cookie"
          :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
          placeholder="请输入站点Cookies，与UA搭配使用效果更佳"
          type="textarea"
        />
      </n-form-item>
      <n-form-item label="UserAgent" path="user_agent" required>
        <n-input
          v-model:value="mySiteForm.user_agent" :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
          type="textarea"
        />
      </n-form-item>
      <n-form-item label="删种规则" path="remove_torrent_rules" required>
        <n-input
          v-model:value="mySiteForm.remove_torrent_rules"
          :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
          placeholder="JSON格式，请参照教程填写"
          type="textarea"
        />
      </n-form-item>
      <n-form-item label="RSS" path="rss" required>
        <n-input
          v-model:value="mySiteForm.rss"
          placeholder="请输入站点RSS订阅地址" autocomplete="off"
        />
      </n-form-item>
      <n-form-item label="Free种" path="torrents" required>
        <n-input
          v-model:value="mySiteForm.torrents"
          placeholder="请输入站点免费种刷流地址" autocomplete="off"
        />
      </n-form-item>
      <n-form-item label="下载器" path="downloader" required>
        <n-select
          v-model:value="mySiteForm.downloader_id"
          placeholder="请选择刷流使用的下载器"
          :options="downloaderList.map((downloader:Downloader) => ({
            label: downloader.name,
            value: downloader.id,
          }))"
          filterable
        />
      </n-form-item>
      <n-form-item label="代理服务器" path="custom_server" required>
        <n-input
          v-model:value="mySiteForm.custom_server"
          placeholder="请输入代理服务器地址，部分站点需要" autocomplete="off"
        />
      </n-form-item>
    </n-form>
    <n-divider />
    <n-space justify="center">
      <n-popconfirm
        v-if="mySiteForm.id !== 0"
        @positive-click="removeMySite(mySiteForm.id)"
      >
        <template #trigger>
          <n-button type="error">
            删 除
          </n-button>
        </template>
        确定删除此站点信息吗？
      </n-popconfirm>

      <n-button
        type="primary" :loading="loading"
        @click="handleSaveMySite"
      >
        保存
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical) {
    margin-top: 0;
    margin-bottom: 5px;
}
</style>
