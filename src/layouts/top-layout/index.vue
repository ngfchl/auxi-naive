<script setup lang="ts">
import { HeaderLogo, HeaderTitle, LayoutBase, LayoutContent } from '../common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string | undefined
  inverted?: boolean
}>(), {
  headerHeight: 48,
  inverted: false,
})
defineEmits(['update:collapsed'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
</script>

<template>
  <LayoutBase class="h-screen">
    <n-layout-header
      :inverted="inverted"
      class="pro-admin-mix-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <HeaderLogo :src="logo" />
        <HeaderTitle :title="title" />
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
</template>

<style scoped>
.pro-admin-mix-header{
  height: v-bind(headerHeightVar);
}
.pro-admin-mix-content{
  height: v-bind(contentHeightVar);
}
</style>
