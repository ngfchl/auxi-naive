<script setup lang="ts">
import type { DataTableColumns, DropdownOption } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useSettingsStore } from '~/stores/settings'

const { message } = useGlobalConfig()
const {
  getSettingsFile,
  saveSettingsFile,
  getSettingsToml,
  setContent,
} = useSettingsStore()
const editFlag = ref(false)
const {
  treeData,
  content,
} = storeToRefs(useSettingsStore())

onMounted(async () => {
  await getSettingsToml()
})

let c = ''
/**
 * 未修改内容的话取消编辑回复原样
 * @param value
 */
const handleEdit = async (value: boolean) => {
  await getSettingsFile('ptools.toml')
  editFlag.value = value
  if (value)
    c = `${content.value}`
  else if (content.value !== c) await setContent(c)
}
const handleSave = async () => {
  await saveSettingsFile('ptools.toml')
  editFlag.value = false
  await getSettingsToml()
}
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
</script>

<template>
  <n-space justify="end">
    <n-button :type="editFlag ? 'warning' : 'primary'" @click="handleEdit(!editFlag)">
      <span v-text="!editFlag ? '编辑' : '取消'" />
    </n-button>
    <n-button v-if="editFlag" type="success" @click="handleSave">
      保存
    </n-button>
  </n-space>
  <n-input v-if="editFlag" v-model:value="content" class="code mt-2" type="textarea" placeholder="" />
  <n-data-table
    v-else
    :columns="columns"
    :data="treeData.children"
    :row-key="rowKey"
    default-expand-all
  />
</template>

<style scoped>
.code {
    color: #F2F6FC;
    /*background-color: #1f2c39 !important;*/
    font-size: 16px;
    font-family: 'Heiti SC';
    line-height: 20px;
    word-break: break-word;
    /*border: 1px solid #eee;*/
    height: 75vh;
    width: 98%;
    border-radius: 5px;
    overflow-y: scroll;
    z-index: 999;
}
</style>
