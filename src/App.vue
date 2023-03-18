<script setup lang="ts">
import { useAutoLang } from '~/composables/auto-lang'
import { useAutoDark } from '~/composables/autoDark'
const appStore = useAppStore()
const { layoutTheme, overrideTheme } = storeToRefs(appStore)
useAutoDark()
const { targetLocale } = useAutoLang()
</script>

<template>
  <n-config-provider
    :locale="targetLocale.locale"
    :date-locale="targetLocale.dateLocale"
    :theme="layoutTheme"
    :theme-overrides="overrideTheme"
  >
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
