<script setup lang="ts">
import { Checkbox } from '@vicons/ionicons5'
import type { VNodeChild } from '@vue/runtime-core'
const props = withDefaults(defineProps<{
  layout?: 'mix' | 'side' | 'top'
  inverted?: boolean
  checked?: boolean
  title?: string | (() => VNodeChild)
  dark?: boolean
}>(), {
  inverted: false,
  layout: 'top',
  checked: true,
  dark: false,
})
const contentCss = computed(() => {
  if (props.dark) {
    return [
      'bg-dark',
    ]
  }
  return []
})
const headerClass = computed(() => {
  if (props.inverted || props.dark) {
    if (props.layout === 'mix' || props.layout === 'top') {
      return [
        'bg-[var(--inverted-color)]',
      ]
    }
    if (props.layout === 'side') {
      return [
        'bg-[var(--inverted-color)]',
        'ml-32%',
        'w-68%',
      ]
    }
  }
  return [
    'bg-neutral-200',
  ]
})

const siderClass = computed(() => {
  if (props.layout === 'mix') {
    return [
      'h-73%',
      'bottom-0',
      'mt-5px',
      props.inverted || props.dark ? 'bg-[var(--inverted-color)]' : 'bg-neutral-200',
    ]
  }
  if (props.layout === 'side') {
    return [
      'h-100%',
      props.inverted || props.dark ? 'bg-[var(--inverted-color)]' : 'bg-neutral-200',
    ]
  }
})
</script>

<template>
  <n-space class="p-3">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          tag="div"
          :class="contentCss"
          class="cursor-pointer inline-block relative w-44px h-36px b-rd-2px overflow-hidden bg-[var(--pro-admin-layout-content-bg)] shadow-[var(--pro-admin-layout-box-shadow)]"
        >
          <div
            :class="headerClass"
            class="h-25% absolute top-0 w-100%"
          />
          <div
            v-if="layout !== 'top'"
            :class="siderClass"
            class="w-30% absolute left-0 h-100"
          />
          <div v-if="checked" class="absolute bottom--1 right-1">
            <n-icon color="#0e7a0d" depth="1.0" size="20">
              <Checkbox />
            </n-icon>
          </div>
        </n-el>
      </template>
      {{ typeof title === 'function' ? title() : title }}
    </n-tooltip>
  </n-space>
</template>

<style scoped>

</style>
