<script setup lang="ts">
import { LanguageSharp } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'

defineProps<{
  value: string
  options: DropdownOption[]
}>()

const emit = defineEmits(['update:value'])

const handleSelect = (value: string) => {
  emit('update:value', value)
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    :value="value"
    :options="options"
    @select="handleSelect"
  >
    <n-icon class="text-18px cursor-pointer py-2" size="20">
      <LanguageSharp />
    </n-icon>
  </n-dropdown>
</template>

<style scoped>

</style>
