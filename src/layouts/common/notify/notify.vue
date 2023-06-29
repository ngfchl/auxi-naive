<script lang="ts" setup>
import { NotificationsOutline } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import type { GitLogSchema } from '~/api/user'
import { $getGitLog } from '~/api/user'
import { useGlobalConfig } from '~/composables/gobal-config'
import NotifyContent from '~/layouts/common/notify/notify-content.vue'

const { message } = useGlobalConfig()

const logs = ref<GitLogSchema>({
  local_logs: {},
  update_notes: [],
  update: false,
})
const options = ref<DropdownOption[]>([
  {
    key: 'content',
    type: 'render',
    render: () => h(NotifyContent, {
      local_logs: logs.value.local_logs,
      update_notes: logs.value.update_notes,
    }),
  },
])

onMounted(async () => {
  logs.value = await $getGitLog()
  if (logs.value.update)
    message?.info('同学，代码有更新啦！')
})
</script>

<template>
  <n-dropdown trigger="click" :options="options">
    <n-el class="flex cursor-pointer ">
      <n-badge :value="logs.update ? '新' : ''">
        <n-icon class="text-[var(--n-text-color)]" size="22">
          <NotificationsOutline />
        </n-icon>
      </n-badge>
    </n-el>
  </n-dropdown>
</template>
