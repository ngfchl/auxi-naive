<script setup lang="ts">
const props = withDefaults(defineProps<{
  layout?: 'mix' | 'side' | 'top'
  inverted?: boolean
}>(), {
  inverted: false,
  layout: 'top',
})

const headerClasss = computed(() => {
  if (props.layout === 'mix' || props.layout === 'top') {
    return [
      'bg-[var(--inverted-color)]',
    ]
  }
  if (props.layout === 'side') {
    return [
      'bg-[var(--base-color)]',
    ]
  }
})

const siderClasss = computed(() => {
  if (props.layout === 'mix') {
    return [
      'h-75%',
      'bg-white',
      'bottom-0',
    ]
  }
  if (props.layout === 'side') {
    return [
      'h-100%',
      `bg-[var(${props.inverted ? '--inverted-color' : '--base-color'})]`,
    ]
  }
  return []
})
</script>

<template>
  <n-space class="p-3">
    <n-el
      tag="div"
      class="inline-block relative w-44px h-36px b-rd-2px overflow-hidden bg-[var(--pro-admin-layout-content-bg)] shadow-[var(--pro-admin-layout-box-shadow)]"
    >
      <div
        :class="headerClasss"
        class="h-25% absolute top-0 w-100%"
      />
      <div
        v-if="layout !== 'top'"
        :class="siderClasss"
        class="w-30% absolute left-0 h-100%"
      />
    </n-el>
  </n-space>
</template>

<style scoped>

</style>
