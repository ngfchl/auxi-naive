<script setup lang="ts">
import type { MenuOption, MenuProps } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
import { menuOptions } from '~/composables/menu-data'
const props = withDefaults(defineProps<{
  // ...
  collapsed?: boolean
  collapsedIconSize?: number
  siderCollapsedWidth?: number
  active?: string
  options?: MenuOption[]
  expandedKeys?: MenuProps['expandedKeys']
}>(), {
  // ...
  collapsedIconSize: 24,
})
defineEmits(['update:collapsed', 'update:active', 'update:expandedKeys'])
const attrs = useAttrs()
</script>

<template>
  <n-layout-sider class="pro-admin-layout-sider" v-bind="attrs" collapse-mode="width">
    <slot />
    <SideMenu
      :collapsed-icon-size="collapsedIconSize"
      :collapsed-width="siderCollapsedWidth"
      :collapsed="collapsed"
      :value="active"
      :options="menuOptions"
      :expanded-keys="expandedKeys"
      @update:collapsed="$emit('update:collapsed', $event)"
      @update:value="$emit('update:active', $event)"
      @update:expanded-keys="$emit('update:expandedKeys', $event)"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
