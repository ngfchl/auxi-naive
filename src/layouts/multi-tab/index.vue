<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const nameRef = ref(1)
    const message = useMessage()
    const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    const state = useMultiTabInject()
    function handleClose(name: number) {
      const { value: panels } = panelsRef
      if (panels.length === 1) {
        message.error('最后一个了')
        return
      }
      message.info(`关掉 ${name}`)
      const index = panels.findIndex(v => name === v)
      panels.splice(index, 1)
      if (nameRef.value === name)
        nameRef.value = panels[index]
    }
    return {
      panels: panelsRef,
      name: nameRef,
      handleClose,
    }
  },
})
</script>

<template>
  <n-tabs
    v-model:value="name"
    type="card"
    closable
    tab-style="min-width: 80px;"
    class="bg-white dark:bg-transparent"
    @close="handleClose"
  >
    <template #prefix>
      <div class="ml-5px" />
    </template>
    <template #suffix>
      <n-button type="warning">
        操作
      </n-button>
    </template>
    <n-tab-pane
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
    />
  </n-tabs>
</template>
