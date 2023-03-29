<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

const websiteStore = useWebsiteStore()
const { refMySiteForm, mySiteForm, siteInfoList, addMySiteFormRules } = storeToRefs(websiteStore)
const { saveMySite, removeMySite } = websiteStore

/**
 * 重置表单
 * @param formEl
 */
const resetForm = (formEl: FormInst | undefined) => {
  if (!formEl) return
  formEl()
}
</script>

<template>
  <div>
    <n-form
      ref="refMySiteForm"
      :model="mySiteForm"
      :rules="addMySiteFormRules"
      class="site-form"
      inline-message
      label-position="top"
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
          placeholder="自定义站点名称"
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
          <n-switch v-model:value="mySiteForm.get_torrents" :round="false" border label="">
            <template #checked>
              抓种
            </template>
            <template #unchecked>
              抓种
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
          <n-switch v-model="mySiteForm.brush_flow" :round="false" border label="">
            <template #checked>
              刷流
            </template>
            <template #unchecked>
              刷流
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
        />
      </n-form-item>
      <n-form-item label="Passkey" path="passkey">
        <n-input
          v-model:value="mySiteForm.passkey" clearable
          placeholder=""
          show-word-limit
        />
      </n-form-item>
      <n-form-item label="Cookies" path="cookie">
        <n-input
          v-model:value="mySiteForm.cookie"
          :autosize="{ minRows: 3, maxRows: 6 }"
          autocomplete="off"
          placeholder="请输入站点Cookies，与UA搭配使用效果更佳"
          type="textarea"
        />
      </n-form-item>
      <n-form-item label="UserAgent" path="user_agent" required>
        <n-input
          v-model:value="mySiteForm.user_agent" :autosize="{ minRows: 3, maxRows: 6 }"
          autocomplete="off"
          type="textarea"
        />
      </n-form-item>
    </n-form>
    <n-divider />
    <n-space :gutter="20" class="dialog-footer" justify="center">
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

      <n-button type="primary" @click="saveMySite">
        保存
      </n-button>

      <n-button @click="resetForm(refMySiteForm)">
        重 置
      </n-button>
    </n-space>
  </div>
</template>
