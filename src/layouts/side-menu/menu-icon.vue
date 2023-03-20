<script lang="ts" setup>
import * as icons from '@vicons/ionicons5'
import * as antdIcons from '@vicons/antd'
const props = defineProps<{
  icon: string
}>()
const iconList = {
  ...icons,
  ...antdIcons,
}
const comp = computed(() => (iconList as any)[props.icon])
</script>

<template>
  <n-icon :component="comp" />
</template>
