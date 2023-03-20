<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'
import SideLayout from '../side-layout/index.vue'
import TopLayout from '../top-layout/index.vue'
import MobileLayout from '../mobile-layout/index.vue'
import SettingDrawer from '../setting-drawer/index.vue'

import { useQueryBreakPoints } from '~/composables/query-breakpoints'

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
    :title="layout.title"
  >
    <router-view />
  </MobileLayout>
  <template v-else>
    <MixLayout
      v-if="layout.layout === 'mix'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    />
    <SideLayout
      v-if="layout.layout === 'side'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    />
    <TopLayout
      v-if="layout.layout === 'top'"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
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
