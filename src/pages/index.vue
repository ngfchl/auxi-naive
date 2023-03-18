<script lang="ts" setup>
import { colors } from '~/config/theme'

const appStore = useAppStore()
const handleTheme = (theme: string) => {
  appStore.updateTheme(theme)
}
</script>

<template>
  <div class="flex gap-0 justify-center">
    <n-button v-for="(item, key) in colors" :key="key" :color="item.common.primaryColor" @click="handleTheme(key)">
      {{ key }}
    </n-button>
  </div>
</template>
