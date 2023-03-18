<script setup lang="ts">
import { useAutoDark } from '~/composables/autoDark'
const appStore = useAppStore()
const { layoutTheme, overrideTheme } = storeToRefs(appStore)
useAutoDark()
</script>

<template>
  <n-config-provider :theme="layoutTheme" :theme-overrides="overrideTheme">
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
