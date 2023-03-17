<script setup lang="ts">
import { HeaderLogo, HeaderTitle, LayoutBase, LayoutContent, LayoutHeader, LayoutSider } from '../common'

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
  <n-layout class="h-screen" has-sider>
    <LayoutSider
      :inverted="inverted"
      :collapsed="collapsed"
      :show-trigger="showSiderTrigger"
      :width="siderWidth"
      :collapsed-width="siderCollapsedWidth"
      @update:collapsed="$event => $emit('update:collapsed', $event)"
    >
      <div class="flex items-center justify-center mt-3">
        <HeaderLogo :src="logo" :size="30" />
        <HeaderTitle v-if="!collapsed" :title="title" :size="18" />
      </div>
      <slot name="menu" />
    </LayoutSider>
    <LayoutBase>
      <LayoutHeader
        :inverted="inverted"
        class="pro-admin-mix-header flex justify-between items-center px-4"
      >
        <slot name="headerLeft">
          <div>
            左侧
          </div>
        </slot>
        <slot name="headerRight">
          <div>
            右侧
          </div>
        </slot>
      </LayoutHeader>
      <LayoutContent
        class="pro-admin-mix-content"
      >
        <slot />
      </LayoutContent>
    </LayoutBase>
  </n-layout>
</template>

<style scoped>
.pro-admin-mix-header {
  height: v-bind(headerHeightVar);
}

.pro-admin-mix-content {
  height: v-bind(contentHeightVar);
}
</style>
