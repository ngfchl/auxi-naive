<script setup lang="ts">
import { LayoutContent, LayoutSider, Logo, Title } from '../common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  siderWidth?: number
  siderCollapsedWidth?: number
  showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
  inverted?: boolean
}>(), {
  headerHeight: 48,
  inverted: false,
})

const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
</script>

<template>
  <n-layout class="h-screen" has-sider>
    <LayoutSider
      :inverted="inverted"
      :show-trigger="showSiderTrigger" :width="siderWidth"
      :collapsed-width="siderCollapsedWidth"
    >
      <div class="flex items-center justify-center p-3">
        <Logo :src="logo" :size="30" />
        <Title :title="title" :size="18" />
      </div>
    </LayoutSider>
    <n-layout>
      <n-layout-header
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
      </n-layout-header>
      <LayoutContent
        class="pro-admin-mix-content"
      >
        <slot />
      </LayoutContent>
    </n-layout>
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
