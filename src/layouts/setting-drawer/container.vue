<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <n-space>
    <div class="text-14px font-500">
      {{ title }}
    </div>
    <n-space class="flex gap-0 justify-center">
      <slot />
    </n-space>
  </n-space>
</template>

<style scoped>

</style>
