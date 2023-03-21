<script lang="ts" setup>
import { RefreshOutline } from '@vicons/ionicons5'
import type { TabItem } from '~/layouts/multi-tab/type'
const props = defineProps<{
  item: TabItem
}>()
const { refreshTab, current } = useMultiTab()
</script>

<template>
  <span>
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
