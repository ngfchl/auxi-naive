<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'

withDefaults(defineProps<{
  avatar?: string
  nickname?: string
  options?: DropdownOption[]
  onSelect?: (value: string) => void
}>(), {
  avatar: '/ptools.svg',
  nickname: 'ptools',
})
</script>

<template>
  <n-dropdown
    :options="options"
    @select="onSelect"
  >
    <div class="flex items-center cursor-pointer">
      <n-avatar
        round
        size="small"
        :src="avatar"
      />
      <span v-if="nickname" class="ml-2">{{ nickname }}</span>
    </div>
  </n-dropdown>
</template>
