<script setup lang="ts">
import type { MenuOption, MenuProps } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
import RightContent from '~/layouts/common/header/right-content.vue'

const props = withDefaults(defineProps<{
  // ...
  logo?: string
  title?: string
  side?: boolean
  // active?: string
  inverted?: boolean
  options?: MenuOption[]
  menuVisible?: boolean
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
</script>

<template>
  <n-layout-header
    :inverted="inverted"
    position="absolute"
    class="flex justify-between items-center z-9999"
  >
    <slot name="logo" />
    <div>
      <SideMenu
        v-if="menuVisible"
        :value="active"
        :options="menuOptions"
        :inverted="inverted"
        :expanded-keys="expandedKeys"
        mode="horizontal"
        @update:value="$emit('update:active', $event)"
        @update:expanded-keys="$emit('update:expandedKeys', $event)"
      />
    </div>
    <div class="flex-1" />
    <RightContent />
  </n-layout-header>
</template>
