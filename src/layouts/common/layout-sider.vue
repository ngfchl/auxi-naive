<script setup lang="ts">
import type { MenuOption, MenuProps } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
import { menuOptions } from '~/composables/menu-data'
import HeaderLogo from '~/layouts/common/header/header-logo.vue'
import HeaderTitle from '~/layouts/common/header/header-title.vue'
const props = withDefaults(defineProps<{
  // ...
  // collapsed?: boolean
  logo?: string
  title?: string
  side?: boolean
  collapsedIconSize?: number
  siderCollapsedWidth?: number
  active?: string
  options?: MenuOption[]
  expandedKeys?: MenuProps['expandedKeys']
}>(), {
  // ...
  collapsedIconSize: 24,
  side: false,
})
defineEmits(['update:collapsed', 'update:active', 'update:expandedKeys'])
const attrs = useAttrs()
</script>

<template>
  <n-layout-sider class="pro-admin-layout-sider" v-bind="attrs" collapse-mode="width">
    <slot name="logo" />
    <hr>
    <SideMenu
      :collapsed="attrs.collapsed"
      :collapsed-icon-size="collapsedIconSize"
      :collapsed-width="siderCollapsedWidth"
      :value="active"
      :options="menuOptions"
      :expanded-keys="expandedKeys"
      @update:value="$event => $emit('update:active', $event)"
      @update:collapsed="$event => $emit('update:collapsed', $event)"
      @update:expanded-keys="$event => $emit('update:expandedKeys', $event)"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
