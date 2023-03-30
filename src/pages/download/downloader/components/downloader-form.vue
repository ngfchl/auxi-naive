<script setup lang="ts">
const downloadStore = useDownloadStore()
const {
  getDownloaderList,
  editDownloader,
  removeDownloader,
  saveDownloader,
} = downloadStore
const {
  downloaderForm,
  refDownloaderForm,
  categorySelectList,
  addDownloaderFormRules,
} = storeToRefs(downloadStore)
</script>

<template>
  <n-form
    :ref="refDownloaderForm"
    :model="downloaderForm"
    :rules="addDownloaderFormRules"
    class="site-form"
    inline-message
    label-position="top"
    status-icon
  >
    <n-form-item label="选择下载器类型" path="category">
      <n-select
        v-model:value="downloaderForm.category"
        :placeholder="downloaderForm.id !== 0 ? '' : '请选择要添加的下载器'"
        :options="categorySelectList"
        filterable
      />
    </n-form-item>
    <n-form-item label="下载器名称" path="name">
      <n-input
        v-model:value="downloaderForm.name"
        clearable
        placeholder="请为你的下载器命名"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="用户名" path="username">
      <n-input
        v-model:value="downloaderForm.username"
        clearable
        placeholder="下载器用户名"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input
        v-model:value="downloaderForm.password"
        type="password"
        clearable
        placeholder="下载器密码"
        show-word-limit
        show-password-on="mousedown"
      />
    </n-form-item>
    <n-form-item label="地址" path="host" required>
      <n-input
        v-model:value="downloaderForm.host"
        clearable
        placeholder="下载器地址"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="端口" path="port" required>
      <n-input-number
        v-model:value="downloaderForm.port"
        clearable
        placeholder="下载器端口"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="开启" path="enable" required inline>
      <n-switch v-model:value="downloaderForm.enable" :round="false" />
    </n-form-item>
    <n-form-item label="预留空间" path="reserved_space" required>
      <n-input-number
        v-model:value="downloaderForm.reserved_space"
        clearable
        placeholder="磁盘预留空间"
        show-word-limit
      />
    </n-form-item>
  </n-form>
  <n-space justify="center">
    <n-popconfirm
      v-if="downloaderForm.id !== 0"
      @positive-click="removeDownloader(downloaderForm.id)"
    >
      <template #trigger>
        <n-button type="error">
          删 除
        </n-button>
      </template>
      确定删除此下载器吗？
    </n-popconfirm>

    <n-button type="primary" @click="saveDownloader">
      保存
    </n-button>
  </n-space>
</template>

<style scoped>

</style>
