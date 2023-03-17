<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  title: string | undefined
  size?: number
}>(), {
  size: 24,
})

const titleStyleVar = computed<CSSProperties>(() => ({
  fontSize: `${props.size}px`,
}))
</script>

<template>
  <span v-if="title" :style="titleStyleVar" class="ml-2 truncate">
    {{ title }}
  </span>
</template>

<style scoped>

</style>
