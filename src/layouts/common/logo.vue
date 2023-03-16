<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  size?: number
}>(), {
  size: 24,
})
</script>

<template>
  <n-image :src="src" :width="size" :height="size" preview-disabled />
</template>

<style scoped>

</style>
