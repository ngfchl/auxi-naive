<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'
import SideLayout from '../side-layout/index.vue'
import TopLayout from '../top-layout/index.vue'
import MobileLayout from '../mobile-layout/index.vue'
import { useQueryBreakPoints } from '~/composables/query-breakpoints'

const appStore = useAppStore()
const { layout, visible } = storeToRefs(appStore)
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
      :logo="layout.logo"
      :title="layout.title"
      :collapsed="layout.collapsed"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    >
      <template #headerRight>
        用户菜单
      </template>
      <router-view />
    </MixLayout>
    <TopLayout
      v-if="layout.layout === 'top'"
      :logo="layout.logo"
      :title="layout.title"
    >
      <template #headerRight>
        用户菜单
      </template>
      <router-view />
    </TopLayout>
    <SideLayout
      v-if="layout.layout === 'side'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    >
      <template #headerRight>
        用户菜单
      </template>
      <template #menu>
        菜单栏
      </template>
      <router-view />
    </SideLayout>
  </template>
</template>

<style scoped>

</style>
