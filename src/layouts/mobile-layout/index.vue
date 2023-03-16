<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import { LayoutBase, LayoutContent, Logo, Title } from '../common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  inverted?: boolean
  visible?: boolean
}>(), {
  headerHeight: 48,
  inverted: false,
  visible: false,
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
    <n-layout-header
      :inverted="inverted"
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <!--        <Logo :src="logo" /> -->
        <n-icon @click="onShowMenu">
          <MenuUnfoldOutlined />
        </n-icon>
      </div>
      <slot name="headerRight">
        <div>
          右侧
        </div>
      </slot>
    </n-layout-header>
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
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
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
