<script setup lang="ts">
import { LayoutContent, LayoutSider, Logo, Title } from '../common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  siderWidth?: number
  siderCollapsedWidth?: number
  showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
}>(), {
  headerHeight: 48,
})

const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
</script>

<template>
  <n-layout class="h-screen">
    <n-layout-header
      inverted
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <Logo :src="logo" />
        <Title :title="title" />
      </div>
      <slot name="headerRight">
        <div>
          右侧
        </div>
      </slot>
    </n-layout-header>
    <n-layout has-sider>
      <LayoutSider
        :show-trigger="showSiderTrigger" :width="siderWidth"
        :collapsed-width="siderCollapsedWidth"
        content-style="padding: 24px;"
        class="pro-admin-mix-content"
      >
        菜单栏
      </LayoutSider>
      <LayoutContent
        content-style="padding: 24px;"
        position="absolute"
      >
        <slot />
      </LayoutContent>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.pro-admin-mix-header{
  height: v-bind(headerHeightVar);
}
.pro-admin-mix-content{
  height: v-bind(contentHeightVar);
}
</style>
