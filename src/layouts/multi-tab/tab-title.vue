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
    <MenuIcon
      v-if="item.icon"
      :icon="item.icon"
      class="mr-2"
      :class="[item.route.meta.keepAlive ?? 'alive-animation']"
    />
    {{ $t(item.tabTitle) }}
  </span>
  <n-icon
    v-if="current === item.path"
    class="ml-2 n-base-close n-tabs-tab__close"
    size="18" @click="refreshTab(item.path)"
  >
    <RefreshOutline />
  </n-icon>
</template>

<style scoped>
.alive-animation {
  animation: breath infinite 5s ease;
  color: darkgreen;
}
@keyframes breath {
  0% {
    transform: scale(0.7)
  }
  25% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(0.7);
  }
}
</style>
