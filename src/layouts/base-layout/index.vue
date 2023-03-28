<script setup lang="ts">
import MobileLayout from '../mobile-layout/index.vue'
import SettingDrawer from '../setting-drawer/index.vue'

import { useQueryBreakPoints } from '~/composables/query-breakpoints'
import BasicLayout from '~/layouts/base-layout/basic-layout.vue'

const appStore = useAppStore()

const { layout, visible, themeList } = storeToRefs(appStore)
const { isMobile, isPad, isDesktop } = useQueryBreakPoints()
watchEffect(() => {
  if (isPad.value)
    appStore.toggleCollapsed(true)

  else if (isDesktop.value)
    appStore.toggleCollapsed(false)

  if (isMobile.value)
    appStore.toggleVisible(false)
})
</script>

<template>
  <MobileLayout
    v-if="isMobile"
    v-model:visible="visible"
    :logo="layout.logo"
    :inverted="layout.inverted"
    :title="layout.title"
  >
    <router-view />
  </MobileLayout>
  <template v-else>
    <BasicLayout
      v-model:collapsed="layout.collapsed"
      :is-mobile="isMobile"
      :visible="visible"
      :logo-visible="layout.logoVisible"
      :header-height="layout.headerHeight"
      :logo="layout.logo"
      :title="layout.title"
      :sider-width="layout.siderWidth"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :show-sider-trigger="layout.showSiderTrigger"
      :inverted="layout.layoutStyle === 'inverted'"
      :layout="layout.layout"
    />
  </template>
  <SettingDrawer
    v-model:layout="layout.layout"
    v-model:layout-style="layout.layoutStyle"
    v-model:theme="layout.theme"
    :theme-list="themeList"
    :drawer-width="300"
    :float-top="240"
  />
</template>

<style scoped>

</style>
