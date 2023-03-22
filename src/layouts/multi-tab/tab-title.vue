<script lang="ts" setup>
import { RefreshOutline } from '@vicons/ionicons5'
import type { TabItem } from '~/layouts/multi-tab/type'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
const props = defineProps<{
  item: TabItem
  onContextMenu: (e: MouseEvent) => void
}>()
const { refreshTab, current } = useMultiTab()
const handleContextMenu = (e: MouseEvent) => {
  props.onContextMenu(e)
}
</script>

<template>
  <span class="flex items-center" @contextmenu="handleContextMenu">
    <MenuIcon v-if="item.icon" :icon="item.icon" class="mr-2" />
    {{ $t(item.tabTitle) }}
  </span>
  <n-icon
    v-if="current === item.path"
    class="ml-2 n-base-close n-tabs-tab__close"
    size="18" @click="refreshTab"
  >
    <RefreshOutline />
  </n-icon>
</template>

<style scoped>

</style>
