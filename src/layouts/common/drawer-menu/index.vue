<script setup lang="ts">
import { MenuOutline } from '@vicons/ionicons5'
import type { MenuProps } from 'naive-ui'
import { HeaderLogo, HeaderTitle, LayoutBase, LayoutContent, LayoutHeader } from '../../common'
import SideMenu from '~/layouts/side-menu/index.vue'
import RightContent from '~/layouts/common/header/right-content.vue'

const props = withDefaults(defineProps<{
  logo?: string
  title?: string
  drawerInverted?: boolean
  visible?: boolean
  logoVisible?: boolean
  expandedKeys?: MenuProps['expandedKeys']
}>(), {
  headerHeight: 48,
  drawerInverted: false,
  visible: false,
  logoVisible: true,
})
const emit = defineEmits(['update:visible', 'update:active', 'update:expandedKeys'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const userStore = useUserStore()
const menuOptions = computed(() => userStore.menusData)
const { active } = useMenuState()
const onShowMenu = () => {
  emit('update:visible', true)
}
</script>

<template>
  <n-drawer
    :show="visible"
    :width="240"
    placement="left"
    @update:show="val => $emit('update:visible', val)"
  >
    <n-drawer-content body-content-style="padding:0;">
      <n-layout-header :inverted="drawerInverted" class="h-100%">
        <div v-if="logoVisible" class="h-48px flex justify-center items-center b-b">
          <HeaderLogo :src="logo" :size="24" />
          <HeaderTitle :title="title" :size="18" />
        </div>
        <SideMenu
          :value="active"
          :inverted="drawerInverted"
          :options="menuOptions"
          :expanded-keys="expandedKeys"
          @update:value="$emit('update:active', $event)"
          @update:expanded-keys="$emit('update:expandedKeys', $event)"
        />
      </n-layout-header>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
