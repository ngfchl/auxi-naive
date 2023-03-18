<script lang="ts" setup>
import { colors } from '~/config/theme'

const appStore = useAppStore()
const handleTheme = (theme: string) => {
  appStore.updateTheme(theme)
}
const onSwitch = (lang: string) => {
  useAppLocale().value = lang
}
</script>

<template>
  <div class="flex gap-0 justify-center">
    <n-button v-for="(item, key) in colors" :key="key" :color="item.common.primaryColor" @click="handleTheme(key)">
      {{ key }}
    </n-button>
  </div>
  <n-space>
    <n-input />
    <n-button @click="onSwitch('en-US')">
      English
    </n-button>
    <n-button @click="onSwitch('zh-CN')">
      中文
    </n-button>
  </n-space>
</template>
