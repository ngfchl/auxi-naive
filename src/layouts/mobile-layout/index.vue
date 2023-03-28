<script setup lang="ts">
import { MenuOutline } from '@vicons/ionicons5'
import type { MenuProps } from 'naive-ui'
import { HeaderLogo, HeaderTitle, LayoutBase, LayoutContent, LayoutHeader } from '../common'
import SideMenu from '../side-menu/index.vue'
import RightContent from '~/layouts/common/header/right-content.vue'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  inverted?: boolean
  visible?: boolean
  logoVisible?: boolean
  expandedKeys?: MenuProps['expandedKeys']
}>(), {
  headerHeight: 48,
  inverted: false,
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
  <LayoutBase class="h-screen">
    <LayoutHeader
      :inverted="inverted"
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <template #logo>
        <div class="flex items-center">
          <n-icon size="24" @click="onShowMenu">
            <MenuOutline />
          </n-icon>
        </div>
      </template>

      <RightContent />
    </LayoutHeader>
    <LayoutContent class="pro-admin-mix-content ">
      <slot />
    </LayoutContent>
  </LayoutBase>

  <n-drawer
    :show="visible"
    :width="240"
    placement="left"
    @update:show="val => $emit('update:visible', val)"
  >
    <n-drawer-content body-content-style="padding:0;">
      <n-layout-header :inverted="inverted" class="h-100%">
        <div v-if="logoVisible" class="h-48px flex justify-center items-center b-b">
          <HeaderLogo :src="logo" :size="24" />
          <HeaderTitle :title="title" :size="18" />
        </div>
        <SideMenu
          :inverted="inverted"
          :value="active"
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
.pro-admin-mix-header{
  height: v-bind(headerHeightVar);
}
.pro-admin-mix-content{
  height: v-bind(contentHeightVar);
}
</style>
