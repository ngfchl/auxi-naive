<script lang="ts" setup>
const taskStore = useTaskStore()
const {
  refScheduleForm,
  scheduleForm,
  addScheduleFormRules,
  taskSelectList,
} = storeToRefs(taskStore)
const {
  saveSchedule,
  removeSchedule,
} = taskStore
</script>

<template>
  <n-form
    :ref="refScheduleForm"
    :model="scheduleForm"
    :rules="addScheduleFormRules"
    class="site-form"
    inline-message
    label-position="top"
    status-icon
  >
    <n-form-item v-if="scheduleForm.id === 0" label="选择站点" path="task">
      <n-select
        v-model:value="scheduleForm.task"
        :disabled="scheduleForm.id !== 0"
        :placeholder="scheduleForm.id !== 0 ? '' : '请选择要添加的站点'"
        :options="taskSelectList"
        filterable
      />
    </n-form-item>
    <n-form-item label="任务名称" path="name">
      <n-input
        v-model:value="scheduleForm.name"
        clearable
        placeholder="请为你的任务命名"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="分钟" path="crontab.minute" required>
      <n-input
        v-model:value="scheduleForm.crontab.minute"
        clearable
        placeholder="执行时间：分钟，支持Crontab表达式"
        show-word-limit
      />
    </n-form-item>
    <n-form-item label="小时" path="crontab.hour" required>
      <n-input
        v-model:value="scheduleForm.crontab.hour"
        clearable
        placeholder="执行时间：小时，支持Crontab表达式"
        show-word-limit
      />
    </n-form-item>
  </n-form>
  <n-space justify="center">
    <n-popconfirm
      v-if="scheduleForm.id !== 0"
      @positive-click="removeSchedule(scheduleForm.id)"
    >
      <template #trigger>
        <n-button type="error">
          删 除
        </n-button>
      </template>
      确定删除此任务吗？
    </n-popconfirm>

    <n-button type="primary" @click="saveSchedule">
      保存
    </n-button>
  </n-space>
</template>

<style scoped>

</style>
