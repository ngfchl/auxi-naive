<script setup lang="ts">
import type { MenuOption, MenuProps } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
const props = withDefaults(defineProps<{
  // ...
  collapsed?: boolean
  logo?: string
  title?: string
  side?: boolean
  collapsedIconSize?: number
  siderCollapsedWidth?: number
  // active?: string
  inverted?: boolean
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
const { active } = useMenuState()
const handleChange = (val: boolean) => {
  emit('update:collapsed', val)
}
</script>

<template>
  <n-layout-sider
    :inverted="inverted"
    :collapsed="collapsed"
    class="h-screen" collapse-mode="width" @update:collapsed="handleChange"
  >
    <div class="flex items-center justify-center">
      <slot name="logo" />
    </div>
    <hr>
    <SideMenu
      :collapsed="collapsed"
      :collapsed-icon-size="collapsedIconSize"
      :collapsed-width="siderCollapsedWidth"
      :value="active"
      :options="menuOptions"
      :inverted="inverted"
      :expanded-keys="expandedKeys"
      @update:value="$emit('update:active', $event)"
      @update:collapsed="$emit('update:collapsed', $event)"
      @update:expanded-keys="$emit('update:expandedKeys', $event)"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
