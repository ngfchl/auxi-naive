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
    class="h-28px flex items-center"
    trigger="hover"
    :value="value"
    :options="options"
    @select="handleSelect"
  >
    <n-icon class="cursor-pointer" size="22">
      <LanguageSharp />
    </n-icon>
  </n-dropdown>
</template>

<style scoped>

</style>
