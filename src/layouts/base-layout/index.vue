<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'

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
</template>

<style scoped>

</style>
