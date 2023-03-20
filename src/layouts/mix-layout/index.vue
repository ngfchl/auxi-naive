<script setup lang="ts">
import { HeaderLogo, HeaderTitle, LayoutContent, LayoutHeader, LayoutSider } from '../common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  siderWidth?: number
  siderCollapsedWidth?: number
  showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
  inverted?: boolean
  collapsed?: boolean
}>(), {
  headerHeight: 48,
  inverted: false,
  collapsed: false,
})
defineEmits(['update:collapsed'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
</script>

<template>
  <n-layout class="h-screen">
    <LayoutHeader
      :inverted="inverted"
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <template #logo>
        <div class="flex items-center justify-center">
          <HeaderLogo :src="logo" :size="30" />
          <HeaderTitle :title="title" :size="20" />
        </div>
      </template>
    </LayoutHeader>
    <n-layout has-sider>
      <LayoutSider
        :show-trigger="showSiderTrigger"
        :collapsed="collapsed"
        :inverted="inverted"
        :width="siderWidth"
        :collapsed-width="siderCollapsedWidth"
        class="pro-admin-mix-content"
        @update:collapsed="$emit('update:collapsed', $event)"
      >
        菜单栏
      </LayoutSider>
      <LayoutContent>
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
