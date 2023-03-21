<script setup lang="ts">
import { MenuOutline } from '@vicons/ionicons5'
import { HeaderLogo, HeaderTitle, LayoutContent, LayoutHeader, LayoutSider } from '../common'
import DrawerMenu from '../common/drawer-menu/index.vue'
const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  siderWidth?: number
  siderCollapsedWidth?: number
  showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
  inverted?: boolean
  collapsed?: boolean
  isMobile?: boolean
  layout: 'side' | 'mix' | 'top'
}>(), {
  headerHeight: 48,
  inverted: false,
  collapsed: false,
})
const emit = defineEmits(['update:collapsed', 'update:visible'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const onShowMenu = () => {
  emit('update:visible', true)
}
</script>

<template>
  <n-layout class="h-screen" :has-sider="layout === 'side'">
    <LayoutHeader
      v-if="layout !== 'side'"
      :inverted="inverted"
      :menu-visible="layout === 'top'"
      class="pro-admin-mix-header flex justify-between items-center px-4 "
    >
      <template v-if="layout !== 'side'" #logo>
        <div class="flex items-center justify-center">
          <n-icon v-if="isMobile" size="24" @click="onShowMenu">
            <MenuOutline />
          </n-icon>
          <HeaderLogo :src="logo" :size="30" />
          <HeaderTitle v-if="!collapsed" :title="title" :size="20" />
        </div>
      </template>
    </LayoutHeader>
    <LayoutSider
      v-if="layout === 'side'"
      :show-trigger="showSiderTrigger"
      :collapsed="collapsed"
      :inverted="inverted"
      :width="siderWidth"
      :collapsed-width="siderCollapsedWidth"
      class="h-screen"
      @update:collapsed="$emit('update:collapsed', $event)"
    >
      <template #logo>
        <div class="flex items-center justify-center pro-admin-mix-header">
          <HeaderLogo :src="logo" :size="30" />
          <HeaderTitle v-if="!collapsed" :title="title" :size="20" />
        </div>
      </template>
    </LayoutSider>
    <n-layout :has-sider="layout !== 'side'">
      <LayoutSider
        v-if="layout === 'mix'"
        :show-trigger="showSiderTrigger"
        :collapsed="collapsed"
        :inverted="inverted"
        :width="siderWidth"
        :collapsed-width="siderCollapsedWidth"
        @update:collapsed="$emit('update:collapsed', $event)"
      >
        <template v-if="layout === 'side'" #logo>
          <div class="flex items-center justify-center">
            <HeaderLogo :src="logo" :size="30" />
            <HeaderTitle :title="title" :size="20" />
          </div>
        </template>
      </LayoutSider>
      <LayoutHeader
        v-if="layout === 'side'"
        :inverted="inverted"
        class="pro-admin-mix-header flex justify-between items-center px-4"
      >
        <template v-if="layout !== 'side'" #logo>
          <div class="flex items-center justify-center h-48px">
            <HeaderLogo :src="logo" :size="30" />
            <HeaderTitle :title="title" :size="20" />
          </div>
        </template>
      </LayoutHeader>
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
