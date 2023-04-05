<script setup lang="ts">
import type { DataTableColumns, DropdownOption } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useSettingsStore } from '~/stores/settings'
const { message } = useGlobalConfig()
const { getSettingsToml } = useSettingsStore()
const { treeData } = storeToRefs(useSettingsStore())
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const handleSelect = () => {
  showDropdownRef.value = false
}
const onClickOutside = () => {
  showDropdownRef.value = false
}
onMounted(async () => {
  await getSettingsToml()
})
const rowKey = (row: RowData) => row.index
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
  },
  {
    title: '配置项名称',
    key: 'index',
  },
  {
    title: '值',
    key: 'name',
  },
]
const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit',
  },
  {
    label: () => h('span', { style: { color: 'red' } }, '删除'),
    key: 'delete',
  },
]
const rowProps = (row: ParentNode) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      e.preventDefault()
      if (row.children.length > 0) {
        message?.info(JSON.stringify(row, null, 2))
        showDropdownRef.value = false
        nextTick().then(() => {
          showDropdownRef.value = true
          xRef.value = e.clientX
          yRef.value = e.clientY
        })
      }
    },
  }
}
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="treeData.children"
    :row-key="rowKey"
    :row-props="rowProps"
    default-expand-all
  />
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="xRef"
    :y="yRef"
    :options="options"
    :show="showDropdownRef"
    :on-clickoutside="onClickOutside"
    @select="handleSelect"
  />
</template>

<style scoped>

</style>
