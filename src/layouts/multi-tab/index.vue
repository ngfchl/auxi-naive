<script lang="ts" setup>
import { EllipsisVerticalSharp } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import { useMultiTab } from '~/composables/multi-tabs-state'
import TabTitle from '~/layouts/multi-tab/tab-title.vue'
import type { TabItem } from '~/layouts/multi-tab/type'
const state = useMultiTabInject()
const { tabList, current, closeTab, refreshTab } = useMultiTab()
const router = useRouter()

const contextMenuPosition = reactive({
  x: 0,
  y: 0,
  show: false,
})
const handleClose = (path: string) => {
  closeTab(path)
  contextMenuPosition.show = false
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  contextMenuPosition.show = false
  nextTick().then(() => {
    contextMenuPosition.show = true
    contextMenuPosition.x = e.clientX
    contextMenuPosition.y = e.clientY
  })
}
const renderTabTitle = (item: TabItem) => {
  return h(TabTitle, { item, onContextMenu: handleContextMenu })
}

const options = $computed<DropdownOption[]>(() => [
  {
    label: '关闭当前页',
    key: 'closeCurrent',
    disabled: tabList.value.length <= 1,
  }, {
    label: '刷新当前页',
    key: 'refreshCurrent',
  },
])
const handleDropdownSelect = (key: string) => {
  if (key === 'closeCurrent')
    closeTab()
  if (key === 'refreshCurrent')
    refreshTab()
  contextMenuPosition.show = false
}
const handleSelectTab = (path: string) => {
  router.push(path)
  contextMenuPosition.show = false
}
</script>

<template>
  <n-tabs
    :value="current"
    type="card"
    tab-style="min-width: 80px;"
    class="bg-white dark:bg-transparent"
    @update:value="handleSelectTab"
    @close="handleClose"
  >
    <template #prefix>
      <div class="ml-5px" />
    </template>
    <template #suffix>
      <n-dropdown type="warning" trigger="click" :options="options" @select="handleDropdownSelect">
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
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="contextMenuPosition.x"
    :y="contextMenuPosition.y"
    :options="options"
    :show="contextMenuPosition.show"
    @select="handleDropdownSelect"
    @clickoutside="contextMenuPosition.show = false"
  />
</template>
