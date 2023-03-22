<script setup lang="ts">
import { useAutoLang } from '~/composables/auto-lang'
import { useAutoDark } from '~/composables/autoDark'
import { useMultiTabProvider } from '~/composables/multi-tabs-state'
const appStore = useAppStore()
const { layoutTheme, overrideTheme } = storeToRefs(appStore)
useAutoDark()
const { naiveLocale } = useAutoLang()
useMenuStateProvider()
useMultiTabProvider()
</script>

<template>
  <n-config-provider
    :locale="naiveLocale.locale"
    :date-locale="naiveLocale.dateLocale"
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
