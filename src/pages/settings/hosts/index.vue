<script setup lang="ts">
import hljs from 'highlight.js/lib/core'

const settingStore = useSettingsStore()
const { content } = storeToRefs(settingStore)
const editFlag = ref(false)
const {
  getSettingsFile,
  saveSettingsFile,
  setContent,
} = settingStore
onMounted(async () => {
  await getSettingsFile('hosts')
})
let c = ''

/**
 * 未修改内容的话取消编辑回复原样
 * @param value
 */
const handleEdit = async (value: boolean) => {
  editFlag.value = value
  if (value)
    c = `${content.value}`
  else
  if (content.value !== c) await setContent(c)
}
const handleSave = async () => {
  await saveSettingsFile('hosts')
  editFlag.value = false
}
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
  <n-code v-else :code="content" show-line-numbers class="text-16px px-2 mt-2" :hljs="hljs" language="host" />
</template>

<style scoped>
.code {
  background-color: #FAF5F5 !important;
  font-size: 13px;
  font-family: 'Heiti SC';
  line-height: 16px;
  word-break: break-word;
  border: 1px solid #eee;
  height: 80vh;
  width: 98%;
  border-radius: 5px;
  overflow-y: scroll;
  z-index: 999;
}
</style>
