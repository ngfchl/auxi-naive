<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'
import SideLayout from '../side-layout/index.vue'

const appStore = useAppStore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <MixLayout
    v-if="layout.layout === 'mix'"
    :logo="layout.logo"
    :title="layout.title"
    :show-sider-trigger="layout.showSiderTrigger"
    :sider-collapsed-width="layout.siderCollapsedWidth"
    :sider-width="layout.siderWidth"
  >
    <template #headerRight>
      用户菜单
    </template>
    <router-view />
  </MixLayout>
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
    <router-view />
  </SideLayout>
</template>

<style scoped>

</style>
