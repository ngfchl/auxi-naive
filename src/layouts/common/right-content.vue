<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { Component } from 'vue'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@vicons/antd'
import type { VNodeChild } from '@vue/runtime-core'
import { NIcon } from 'naive-ui'
import SelectLang from './select-lang/index.vue'
import SelectUser from '~/layouts/common/select-user.vue'

const appStore = useAppStore()
const appLocale = useAppLocale()
const userStore = useUserStore()

const { t } = useI18n()
const renderIcon = (icon: Component): VNodeChild => h(NIcon, null, {
  default: () => h(icon),
})
const userOptions = ref<DropdownOption[]>([
  {
    label: () => t('global.layout.header.right.user.center'),
    key: 'user-center',
    icon: () => renderIcon(UserOutlined),
  },
  {
    label: () => t('global.layout.header.right.user.setting'),
    key: 'user-setting',
    icon: () => renderIcon(SettingOutlined),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: () => t('global.layout.header.right.logout'),
    icon: () => renderIcon(LogoutOutlined),
    key: 'logout',
  },
])
const handleSelect = (value: string) => {
  if (value === 'logout')
    userStore.logout()
}
</script>

<template>
  <SelectLang v-model:value="appLocale" :options="appStore.localeOptions" />
  <n-space align="center">
    <SelectUser :options="userOptions" @select="handleSelect" />
  </n-space>
</template>

<style scoped>

</style>
