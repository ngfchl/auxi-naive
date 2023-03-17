<script lang="ts" setup>
import type { LayoutTheme } from '~/config/layout-theme'

const appStore = useAppStore()
const handleTheme = (theme: LayoutTheme['layoutStyle']) => {
  appStore.updateLayoutStyle(theme)
}
</script>

<template>
  <div class="flex gap-0 justify-center">
    <n-button @click="handleTheme('dark')">
      深色
    </n-button>
    <n-button @click="handleTheme('light')">
      浅色
    </n-button>
  </div>
</template>
