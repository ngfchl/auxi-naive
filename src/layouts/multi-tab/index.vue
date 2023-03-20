<script lang="ts" setup>
import { EllipsisVerticalSharp } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import { useMultiTab } from '~/composables/multi-tabs-state'
import TabTitle from '~/layouts/multi-tab/tab-title.vue'
import type { TabItem } from '~/layouts/multi-tab/type'
const state = useMultiTabInject()
const { tabList, current, closeTab } = useMultiTab()
function handleClose(name: number) {

}
const renderTabTitle = (item: TabItem) => {
  return h(TabTitle, { item })
}
const options = $ref<DropdownOption[]>([
  {
    label: '关闭当前页',
    key: 'closeCurrent',
    disabled: tabList.value.length <= 1,
  }, {
    label: '刷新当前页',
    key: 'refreshCurrent',
  },
])
const handleSelect = (key: string) => {
  if (key === 'closeCurrent')
    closeTab()
}
</script>

<template>
  <n-tabs
    :value="current"
    type="card"
    tab-style="min-width: 80px;"
    class="bg-white dark:bg-transparent"
    @close="handleClose"
  >
    <template #prefix>
      <div class="ml-5px" />
    </template>
    <template #suffix>
      <n-dropdown type="warning" trigger="click" :options="options" @select="handleSelect">
        <n-icon size="16" class="cursor-pointer">
          <EllipsisVerticalSharp />
        </n-icon>
      </n-dropdown>
    </template>
    <n-tab-pane
      v-for="panel in tabList"
      :key="panel.path"
      closable
      :tab="renderTabTitle(panel)"
      :name="panel.path"
    />
  </n-tabs>
</template>
