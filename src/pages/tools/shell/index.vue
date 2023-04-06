<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import { useShellStore } from '~/stores/tools/shell'
const shellStore = useShellStore()
const {
  shell,
  results,
  options,
} = storeToRefs(shellStore)
const { exec_shell } = shellStore
</script>

<template>
  <div class="pt-5px">
    <div class="mb-2 px-5px">
      <n-input
        v-model:value="shell"
        size="small"
        class="mr-2"
        @change="exec_shell"
      />
      <n-dropdown
        size="small"
        trigger="hover"
        :options="options"
        @select="exec_shell"
      >
        <n-button
          size="tiny"
          type="warning"
        >
          选择命令
        </n-button>
      </n-dropdown>
      <n-tag type="error" size="small">
        回车发送命令，危险动作，不懂勿动。
      </n-tag>
    </div>
    <div class="code">
      <n-code
        v-for="(result, index) in results"
        :key="index"
        class="px-3px"
        language="Shell"
        :code="result"
        :hljs="hljs"
      />
    </div>
  </div>
</template>

<style scoped>
.code {
  color: #F2F6FC;
  background-color: #1f2c39 !important;
  font-size: 13px;
  font-family: 'Heiti SC';
  line-height: 18px;
  word-break: break-word;
  border: 1px solid #eee;
  height: 75vh;
  width: 98%;
  margin: auto;
  border-radius: 5px;
  overflow-y: scroll;
}
</style>
