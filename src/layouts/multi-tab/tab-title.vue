<script lang="ts" setup>
import type { TabItem } from '~/layouts/multi-tab/type'

const props = defineProps<{
  item: TabItem
}>()
</script>

<template>
  {{ $t(item.tabTitle) }}
</template>

<style scoped>

</style>
