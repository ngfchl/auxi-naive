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
    label-placement="left"
    status-icon
    size="small"
  >
    <n-form-item label="类型" path="category">
      <n-select
        v-model:value="downloaderForm.category"
        :placeholder="downloaderForm.id !== 0 ? '' : '请选择要添加的下载器'"
        :options="categorySelectList"
        filterable
      />
    </n-form-item>
    <n-form-item label="名称" path="name">
      <n-input
        v-model:value="downloaderForm.name"
        clearable
        placeholder="请为你的下载器命名"
        show-word-limit
      />
    </n-form-item>

    <n-form-item label="协议" path="http" required>
      <n-select
        v-model:value="downloaderForm.http"
        :options="[
          { label: 'http', value: 'http' },
          { label: 'https', value: 'https' },
        ]"
        default-value="http"
        filterable
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
    <n-form-item label="账户" path="username">
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
    <n-form-item label="首页展示" path="enable" label-placement="left" required inline>
      <n-switch v-model:value="downloaderForm.enable" :round="false">
        <template #checked>
          在首页和下载器管理中展示
        </template>
        <template #unchecked>
          不展示
        </template>
      </n-switch>
    </n-form-item>
    <n-form-item label="刷流专用" path="brush" label-placement="left" required inline>
      <n-switch v-model:value="downloaderForm.brush" :round="false">
        <template #checked>
          刷流专用
        </template>
        <template #unchecked>
          刷流专用才会触发删种规则
        </template>
      </n-switch>
    </n-form-item>
    <n-form-item label="拆包刷流" path="package_files" label-placement="left" required inline>
      <n-switch v-model:value="downloaderForm.package_files" :round="false">
        <template #checked>
          种子过大时拆包下载
        </template>
        <template #unchecked>
          不拆包下载
        </template>
      </n-switch>
    </n-form-item>
    <n-form-item label="删除单种" path="delete_one_file" label-placement="left" required inline>
      <n-switch v-model:value="downloaderForm.delete_one_file" :round="false">
        <template #checked>
          拆包下载时删除单种
        </template>
        <template #unchecked>
          拆包下载时不删除单种
        </template>
      </n-switch>
    </n-form-item>
    <n-form-item label="限制数量" path="count_torrents" label-placement="left" required>
      <n-input-number
        v-model:value="downloaderForm.count_torrents"
        clearable
        placeholder="限制下载器正在运行的种子数量，达到此数字则不再添加任务"
        show-word-limit
        :min="1"
        :step="1"
      />
    </n-form-item>
    <n-form-item label="拆包大小" path="package_size" label-placement="left" required>
      <n-input-number
        v-model:value="downloaderForm.package_size"
        clearable
        placeholder="多大的包才拆？单位：GB"
        show-word-limit
        min="1"
        :step="1"
      />
    </n-form-item>
    <n-form-item label="拆包比例" path="package_percent" label-placement="left" required>
      <n-input-number
        v-model:value="downloaderForm.package_percent"
        clearable
        placeholder="拆包百分比，填写0-1之间的小数"
        show-word-limit
        :precision="2"
        :min="0.1"
        :max="0.99"
        :step="0.01"
      />
    </n-form-item>
    <n-form-item label="预留空间" path="reserved_space" label-placement="left" required>
      <n-input-number
        v-model:value="downloaderForm.reserved_space"
        clearable
        placeholder="磁盘预留空间"
        show-word-limit
        :min="1"
        :step="1"
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
