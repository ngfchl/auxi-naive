<script setup lang="ts">
import type { MenuOption, MenuProps } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
// import { menuOptions } from '~/composables/menu-data'
const props = withDefaults(defineProps<{
  // ...
  collapsed?: boolean
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
const emit = defineEmits(['update:collapsed', 'update:active', 'update:expandedKeys'])
const userStore = useUserStore()
const menuOptions = computed(() => userStore.menusData)
const handlechange = (val: boolean) => {
  emit('update:collapsed', val)
}
</script>

<template>
  <n-layout-sider :collapsed="collapsed" class="pro-admin-layout-sider" collapse-mode="width" @update:collapsed="handlechange">
    <slot name="logo" />
    <hr>
    <SideMenu
      :collapsed="collapsed"
      :collapsed-icon-size="collapsedIconSize"
      :collapsed-width="siderCollapsedWidth"
      :value="active"
      :options="menuOptions"
      :expanded-keys="expandedKeys"
      @update:value="$emit('update:active', $event)"
      @update:collapsed="$emit('update:collapsed', $event)"
      @update:expanded-keys="$emit('update:expandedKeys', $event)"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
