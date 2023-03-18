<script lang="ts" setup>
import { CheckboxOutline } from '@vicons/ionicons5'
defineProps<{
  color: string
  title: string
  checked?: boolean
}>()
</script>

<template>
  <n-space class="p-3">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <div :style="{ background: color }" class="cursor-pointer flex w-20px h-20px items-center justify-center">
          <n-icon v-if="checked" size="16">
            <CheckboxOutline />
          </n-icon>
        </div>
      </template>
      {{ title }}
    </n-tooltip>
  </n-space>
</template>
