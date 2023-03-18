<script lang="ts" setup>
import { CheckboxOutline } from '@vicons/ionicons5'
defineProps<{
  color: string
  checked?: boolean
}>()
</script>

<template>
  <div :style="{ background: color }" class="cursor-pointer flex w-20px h-20px items-center justify-center">
    <n-icon v-if="checked" size="16">
      <CheckboxOutline />
    </n-icon>
  </div>
</template>
