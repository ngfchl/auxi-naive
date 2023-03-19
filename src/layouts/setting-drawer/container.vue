<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="pb-2">
    <n-space class="text-14px font-500 w-100%">
      {{ title }}
    </n-space>
    <n-space class="flex gap-0 justify-center">
      <slot />
    </n-space>
  </div>
</template>

<style scoped>

</style>
