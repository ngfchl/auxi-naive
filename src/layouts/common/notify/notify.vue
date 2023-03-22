<script lang="ts" setup>
import { NotificationsOutline } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import NotifyContent from '~/layouts/common/notify/notify-content.vue'
withDefaults(defineProps<{
  count?: number
  maxCount?: number
}>(), {
  maxCount: 99,
  count: 0,
})

const options = ref<DropdownOption[]>([
  {
    key: 'content',
    type: 'render',
    render: () => h(NotifyContent),
  },
])
</script>

<template>
  <n-dropdown trigger="click" :options="options">
    <n-el class="flex cursor-pointer ">
      <n-badge :value="count" :max="maxCount">
        <n-icon class="text-[var(--n-text-color)]" size="22">
          <NotificationsOutline />
        </n-icon>
      </n-badge>
    </n-el>
  </n-dropdown>
</template>
