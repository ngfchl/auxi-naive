<script setup lang="ts">
import { MenuOutline } from '@vicons/ionicons5'
import { HeaderLogo, HeaderTitle, LayoutBase, LayoutContent, LayoutHeader } from '../common'
const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  headerInverted?: boolean
  drawerInverted?: boolean
  visible?: boolean
  logoVisible?: boolean
}>(), {
  headerHeight: 48,
  headerInverted: false,
  drawerInverted: false,
  visible: false,
  logoVisible: true,
})
const emit = defineEmits(['update:visible'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)

const onShowMenu = () => {
  emit('update:visible', true)
}
</script>

<template>
  <LayoutBase class="h-screen">
    <LayoutHeader
      :inverted="headerInverted"
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <n-icon @click="onShowMenu">
          <MenuOutline />
        </n-icon>
      </div>
      <slot name="headerRight">
        <div>
          右侧
        </div>
      </slot>
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
      <n-layout-header :inverted="drawerInverted" class="h-100%">
        <div v-if="logoVisible" class="h-48px flex justify-center items-center b-b">
          <HeaderLogo :src="logo" :size="24" />
          <HeaderTitle :title="title" :size="18" />
        </div>
        《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
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
