<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  size?: number
}>(), {
  size: 24,
})

const titleStyleVar = computed<CSSProperties>(() => ({
  fontSize: `${props.size}px`,
}))
</script>

<template>
  <span v-if="title" :style="titleStyleVar" class="ml-2">
    {{ title }}
  </span>
</template>

<style scoped>

</style>
